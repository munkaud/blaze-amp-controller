const { InstanceBase, InstanceStatus, TCPHelper, runEntrypoint } = require('@companion-module/base');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.socket = null;
    this.state = { power: 'unknown', inputs: 0, zones: 0, outputs: 0 };
  }

  async init(config) {
    this.config = config;
    this.initSocket();
    this.initActions();
    this.initPresets();
    this.initFeedbacks();
  }

  async configUpdated(config) {
    this.config = config;
    this.initSocket();
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Amplifier IP Address', width: 6, default: '192.168.1.100' },
      { type: 'number', id: 'port', label: 'Port', width: 4, default: 7621, min: 1, max: 65535 },
    ];
  }

  initSocket() {
    if (this.socket) {
      this.socket.destroy();
    }

    if (!this.config.host || !this.config.port) {
      this.updateStatus(InstanceStatus.BadConfig);
      this.log('warn', 'Please configure the IP address and port');
      return;
    }

    this.socket = new TCPHelper(this.config.host, this.config.port);

    this.socket.on('connect', () => {
      this.updateStatus(InstanceStatus.Ok);
      this.log('info', 'Connected to Blaze Audio amplifier');
      this.socket.send('GET POWER\n'); // Poll initial power state
    });

    this.socket.on('data', (data) => {
      const message = data.toString().trim();
      this.log('debug', `Received: ${message}`);
      this.parseResponse(message);
    });

    this.socket.on('error', (err) => {
      this.updateStatus(InstanceStatus.ConnectionFailure);
      this.log('error', `Socket error: ${err.message}`);
    });
  }

  parseResponse(message) {
    if (message === '*POWER_ON') {
      this.state.power = 'on';
    } else if (message === '*POWER_OFF') {
      this.state.power = 'off';
    } else if (message.startsWith('*INPUTS')) {
      this.state.inputs = parseInt(message.split(' ')[1], 10);
    } else if (message.startsWith('*ZONES')) {
      this.state.zones = parseInt(message.split(' ')[1], 10);
    } else if (message.startsWith('*OUTPUTS')) {
      this.state.outputs = parseInt(message.split(' ')[1], 10);
    }
    this.checkFeedbacks();
  }

  async destroy() {
    if (this.socket) {
      this.socket.destroy();
    }
    this.log('info', 'Instance destroyed');
  }

  initActions() {
    const actions = {
      powerOn: {
        name: 'Power On',
        options: [],
        callback: async () => {
          if (!this.socket) return this.log('error', 'Socket not connected');
          try {
            this.socket.send('POWER_ON\n');
            this.log('info', 'Power On command sent');
          } catch (err) {
            this.log('error', `Failed to send Power On: ${err.message}`);
          }
        },
      },
      powerOff: {
        name: 'Power Off',
        options: [],
        callback: async () => {
          if (!this.socket) return this.log('error', 'Socket not connected');
          try {
            this.socket.send('POWER_OFF\n');
            this.log('info', 'Power Off command sent');
          } catch (err) {
            this.log('error', `Failed to send Power Off: ${err.message}`);
          }
        },
      },
      getConfig: {
        name: 'Get Amp Config',
        options: [],
        callback: async () => {
          if (!this.socket) return this.log('error', 'Socket not connected');
          try {
            this.socket.send('GET INPUTS\n');
            this.socket.send('GET ZONES\n');
            this.socket.send('GET OUTPUTS\n');
            this.log('info', 'Requested amp configuration');
          } catch (err) {
            this.log('error', `Failed to request config: ${err.message}`);
          }
        },
      },
    };
    this.setActionDefinitions(actions);
  }

  initPresets() {
    const presets = [
      {
        type: 'button',
        category: 'Power Control',
        name: 'Power On',
        style: { text: 'Power On', size: '18', color: '16777215', bgcolor: '0' },
        steps: [{ down: [{ actionId: 'powerOn', options: {} }], up: [] }],
        feedbacks: [{ feedbackId: 'powerOnState' }],
      },
      {
        type: 'button',
        category: 'Power Control',
        name: 'Power Off',
        style: { text: 'Power Off', size: '18', color: '16777215', bgcolor: '0' },
        steps: [{ down: [{ actionId: 'powerOff', options: {} }], up: [] }],
        feedbacks: [{ feedbackId: 'powerOffState' }],
      },
      {
        type: 'button',
        category: 'Configuration',
        name: 'Get Amp Config',
        style: { text: 'Get Config', size: '14', color: '16777215', bgcolor: '0' },
        steps: [{ down: [{ actionId: 'getConfig', options: {} }], up: [] }],
        feedbacks: [],
      },
    ];
    this.setPresetDefinitions(presets);
  }

  initFeedbacks() {
    const feedbacks = {
      powerOnState: {
        type: 'advanced',
        name: 'Power On Indicator',
        description: 'Show checkmark when amp is on',
        options: [],
        callback: () => {
          if (this.state.power === 'on') {
            return { text: 'Power On ✓', bgcolor: '2263842' }; // Green with checkmark
          }
          return { text: 'Power On', bgcolor: '0', color: '8421504' }; // Greyed out
        },
      },
      powerOffState: {
        type: 'advanced',
        name: 'Power Off Indicator',
        description: 'Show checkmark when amp is off',
        options: [],
        callback: () => {
          if (this.state.power === 'off') {
            return { text: 'Power Off ✓', bgcolor: '9109504' }; // Red with checkmark
          }
          return { text: 'Power Off', bgcolor: '0', color: '8421504' }; // Greyed out
        },
      },
    };
    this.setFeedbackDefinitions(feedbacks);
  }
}

runEntrypoint(BlazeAudioInstance, []);