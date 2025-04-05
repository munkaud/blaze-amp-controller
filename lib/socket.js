const { TCPHelper, InstanceStatus } = require('@companion-module/base');
const poller = require('./poller');
const parseResponse = require('./parser');

module.exports = {
  initSocket(instance) {
    if (instance.socket) {
      instance.socket.destroy();
    }
    if (!instance.config.host || !instance.config.port) {
      instance.updateStatus(InstanceStatus.BadConfig);
      instance.log('warn', 'Please configure the IP address and port');
      return;
    }
    instance.socket = new TCPHelper(instance.config.host, instance.config.port); // Line 11
    instance.initialized = false;

    instance.socket.on('connect', () => {
      instance.updateStatus(InstanceStatus.Ok);
      instance.log('info', 'Connected to Blaze Audio amplifier');
      poller.pollConfig(instance);
    });

    instance.socket.on('data', (data) => {
      const messages = data.toString().trim().split('\n');
      messages.forEach(message => parseResponse(instance, message));
      instance.log('debug', 'Data received, updating presets');
      instance.updatePresets();
    });

    instance.socket.on('error', (err) => {
      instance.updateStatus(InstanceStatus.ConnectionFailure);
      instance.log('error', `Socket error: ${err.message}`);
    });
  },

  destroySocket(instance) {
    if (instance.socket) {
      instance.socket.destroy();
      instance.socket = null;
      instance.log('info', 'Socket destroyed');
    }
  }
};