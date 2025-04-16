const { TCPHelper } = require('@companion-module/base');

class SocketManager {
  constructor(instance) {
    this.instance = instance;
    this.socket = null;
    this.commandQueue = [];
    this.commandDelay = 250;
    this.isProcessingCommand = false;
    this.pollingInterval = null;
    this.isSubscribed = false;
  }

  async setupSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    this.socket = new TCPHelper(this.instance.config.host, this.instance.config.port || 10001);

    this.socket.on('connect', () => {
      this.instance.updateStatus('ok');
      this.instance.log('info', 'Connected to Blaze Audio amplifier');
      this.startPolling();
    });

    this.socket.on('error', (err) => {
      this.instance.updateStatus('error', err.message);
      this.instance.log('error', `Socket error: ${err.message}`);
    });

    this.socket.on('data', (data) => {
      const message = data.toString().trim();
      const messages = message.split('\n').filter(msg => msg.trim() !== '');
      for (const msg of messages) {
        if (
          !msg.startsWith('*GET') &&
          !msg.startsWith('*SET') &&
          !msg.startsWith('*SUBSCRIBE') &&
          !msg.startsWith('*UNSUBSCRIBE')
        ) {
          this.instance.log('debug', `Received: ${msg}`);
        }
      }
      this.instance.messageProcessor.process(message);
    });

    this.socket.on('close', () => {
      this.instance.updateStatus('disconnected');
      this.instance.log('info', 'Socket closed');
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
      this.isSubscribed = false;
    });
  }

  startPolling() {
    this.instance.log('info', 'Starting full polling');
    this.queueCommand('GET SYSTEM.STATUS.STATE\n');
    this.queueCommand('GET IN.COUNT\n');
    this.queueCommand('GET ZONE.COUNT\n');
    this.queueCommand('GET OUT.COUNT\n');
    this.queueCommand('GET IN.EQ.COUNT\n');
    this.queueCommand('GET API_VERSION\n');
    this.queueCommand('GET SYSTEM.STATUS.SIGNAL_IN\n');
    this.queueCommand('GET SYSTEM.STATUS.SIGNAL_OUT\n');
    this.queueCommand('GET SYSTEM.STATUS.LAN\n');
    this.queueCommand('GET SYSTEM.STATUS.WIFI\n');
    this.queueCommand('GET SYSTEM.TEMPERATURE\n');
    this.queueCommand('GET SYSTEM.FAN\n');
    this.queueCommand('GET SYSTEM.VERSION\n');
    this.queueCommand('GET SYSTEM.DEVICE.SWID\n');
    this.queueCommand('GET SYSTEM.DEVICE.HWID\n');
    this.queueCommand('GET SYSTEM.DEVICE.VENDOR_NAME\n');
    this.queueCommand('GET SYSTEM.DEVICE.MODEL_NAME\n');
    this.queueCommand('GET SYSTEM.DEVICE.SERIAL\n');
    this.queueCommand('GET SYSTEM.DEVICE.FIRMWARE\n');
    this.queueCommand('GET SYSTEM.DEVICE.FIRMWARE_DATE\n');
    this.queueCommand('GET SYSTEM.DEVICE.MAC\n');
    this.queueCommand('GET SYSTEM.DEVICE.WIFI_MAC\n');
    this.queueCommand('GET SETUP.SYSTEM.DEVICE_NAME\n');
    this.queueCommand('GET SETUP.SYSTEM.VENUE_NAME\n');
    this.queueCommand('GET SETUP.SYSTEM.CUSTOMER_NAME\n');
    this.queueCommand('GET SETUP.SYSTEM.ASSET_TAG\n');
    this.queueCommand('GET SETUP.SYSTEM.INSTALLER_NAME\n');
    this.queueCommand('GET SETUP.SYSTEM.CONTACT_INFO\n');
    this.queueCommand('GET SETUP.SYSTEM.INSTALL_DATE\n');
    this.queueCommand('GET SETUP.SYSTEM.INSTALL_NOTES\n');
    this.queueCommand('GET SETUP.SYSTEM.LOCATING\n');
    this.queueCommand('GET SETUP.SYSTEM.CUSTOM1\n');
    this.queueCommand('GET SETUP.SYSTEM.CUSTOM2\n');
    this.queueCommand('GET SETUP.SYSTEM.CUSTOM3\n');

    // Add commands for zones
    for (let zid = 1; zid <= 4; zid++) {
      const zoneLetter = String.fromCharCode(64 + zid);
      this.queueCommand(`GET ZONE-${zoneLetter}.NAME\n`);
      this.queueCommand(`GET ZONE-${zoneLetter}.PRIMARY_SRC\n`);
      this.queueCommand(`GET ZONE-${zoneLetter}.GAIN\n`);
      this.queueCommand(`GET ZONE-${zoneLetter}.MUTE\n`);
    }

    if (!this.pollingInterval) {
      this.pollingInterval = setInterval(() => {
        this.instance.log('info', 'Periodic polling');
        this.queueCommand('GET SYSTEM.STATUS.STATE\n');
        const knownInputIds = Object.keys(this.instance.state.inputNames).map(Number);
        for (const iid of knownInputIds) {
          if (iid >= 100 && iid < 200) {
            this.queueCommand(`GET IN-${iid}.DYN.SIGNAL\n`);
            this.queueCommand(`GET IN-${iid}.DYN.CLIP\n`);
          }
        }
        for (let zid = 1; zid <= this.instance.state.zones; zid++) {
          const zoneLetter = String.fromCharCode(64 + zid);
          this.queueCommand(`GET ZONE-${zoneLetter}.DYN.SIGNAL\n`);
        }
      }, 5000);
    }
  }

  queueCommand(command) {
    this.instance.log('debug', `Queuing command: ${command.trim()}`);
    this.commandQueue.push(command);
    this.processCommandQueue();
  }

  processCommandQueue() {
    if (this.isProcessingCommand || this.commandQueue.length === 0) return;

    this.isProcessingCommand = true;
    const command = this.commandQueue.shift();
    this.instance.log('debug', `Sending command: ${command.trim()}`);

    if (this.socket) {
      this.socket.send(command)
        .then(() => {})
        .catch((err) => {
          this.instance.log('error', `Failed to send command "${command.trim()}": ${err.message}`);
        })
        .finally(() => {
          setTimeout(() => {
            this.isProcessingCommand = false;
            this.processCommandQueue();
          }, this.commandDelay);
        });
    } else {
      this.instance.log('warn', 'Socket not available, dropping command');
      this.isProcessingCommand = false;
      this.processCommandQueue();
    }
  }

  destroy() {
    if (this.socket) {
      if (this.isSubscribed) {
        this.socket.send('UNSUBSCRIBE\n')
          .then(() => {
            this.instance.log('info', 'Unsubscribed from dynamic updates');
          })
          .catch((err) => {
            this.instance.log('error', `Failed to unsubscribe: ${err.message}`);
          })
          .finally(() => {
            this.socket.close();
            this.socket = null;
            this.isSubscribed = false;
          });
      } else {
        this.socket.close();
        this.socket = null;
      }
    }
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

module.exports = SocketManager;