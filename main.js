const { InstanceBase, InstanceStatus, TCPHelper, runEntrypoint } = require('@companion-module/base');
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const powerPresets = require('./presets/power');
const setupPresets = require('./presets/setup');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.socket = null;
    this.state = { power: 'unknown', inputs: 0, zones: 0, outputs: 0 };
  }

  async init(config) {
    this.config = config;
    this.initSocket();
    this.setActionDefinitions(actions(this));
    this.setFeedbackDefinitions(feedbacks(this));
    this.setPresetDefinitions([...powerPresets(this), ...setupPresets(this)]);
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
      this.socket.send('GET POWER\n');
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
}

runEntrypoint(BlazeAudioInstance, []);