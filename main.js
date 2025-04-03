const { InstanceBase, InstanceStatus, TCPHelper, runEntrypoint } = require('@companion-module/base');
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const powerPresets = require('./presets/power');
const setupPresets = require('./presets/setup');
const inputPresets = require('./presets/inputs');
const digitalPresets = require('./presets/digitals');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.socket = null;
    this.state = { power: 'unknown', inputs: 0, zones: 0, outputs: 0, inputNames: {}, inputSensitivities: {}, inputGains: {}, generatorGain: null, stereoPairs: {} };
  }

  async init(config) {
    this.config = config;
    this.initSocket();
    this.setActionDefinitions(actions(this));
    this.setFeedbackDefinitions(feedbacks(this));
    this.updatePresets();
  }

  async configUpdated(config) {
    this.config = config;
    this.initSocket();
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Amplifier IP Address', width: 6, default: '192.168.12.180' },
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
      this.log('debug', 'Sending: GET POWER\\n');
      this.socket.send('GET POWER\n');
      this.log('debug', 'Sending: GET IN.COUNT\\n');
      this.socket.send('GET IN.COUNT\n');
    });
    this.socket.on('data', (data) => {
      const messages = data.toString().trim().split('\n');
      messages.forEach(message => {
        this.log('debug', `Received: ${message}`);
        this.parseResponse(message);
      });
    });
    this.socket.on('error', (err) => {
      this.updateStatus(InstanceStatus.ConnectionFailure);
      this.log('error', `Socket error: ${err.message}`);
    });
  }

  updatePresets() {
    this.setPresetDefinitions([...powerPresets(this), ...setupPresets(this), ...inputPresets(this), ...digitalPresets(this)]);
  }

  parseResponse(message) {
    this.log('debug', `Parsing response: ${message}`);
    if (message === '*POWER_ON') {
      this.state.power = 'on';
      this.log('info', 'Power state set to ON');
    } else if (message === '*POWER_OFF') {
      this.state.power = 'off';
      this.log('info', 'Power state set to OFF');
    } else if (message.includes('#GET POWER|Command Failed')) {
      this.state.power = 'off';
      this.log('info', 'Power state assumed OFF');
    } else if (message.startsWith('+IN.COUNT')) {
      this.state.inputs = parseInt(message.split(' ')[1], 10);
      this.log('info', `Input count set to ${this.state.inputs}`);
      const primaryIids = [100, 102, 200, 400];
      primaryIids.forEach(iid => {
        this.log('debug', `Sending: GET IN-${iid}.NAME\\n`);
        this.socket.send(`GET IN-${iid}.NAME\n`);
        this.log('debug', `Sending: GET IN-${iid}.GAIN\\n`);
        this.socket.send(`GET IN-${iid}.GAIN\n`);
        if (iid !== 400) {
          this.log('debug', `Sending: GET IN-${iid}.STEREO\\n`);
          this.socket.send(`GET IN-${iid}.STEREO\n`);
        }
        if (iid === 100 || iid === 102) {
          this.log('debug', `Sending: GET IN-${iid}.SENS\\n`);
          this.socket.send(`GET IN-${iid}.SENS\n`);
        }
      });
      const secondaryIids = [101, 103, 201];
      secondaryIids.forEach(iid => {
        this.log('debug', `Sending: GET IN-${iid}.NAME\\n`);
        this.socket.send(`GET IN-${iid}.NAME\n`);
        if (iid === 101 || iid === 103) {
          this.log('debug', `Sending: GET IN-${iid}.SENS\\n`);
          this.socket.send(`GET IN-${iid}.SENS\n`);
          this.log('debug', `Sending: GET IN-${iid}.GAIN\\n`); // Add 103 gain polling
          this.socket.send(`GET IN-${iid}.GAIN\n`);
        }
      });
    } else if (message.startsWith('+ZONE.COUNT')) {
      this.state.zones = parseInt(message.split(' ')[1], 10);
      this.log('info', `Zone count set to ${this.state.zones}`);
    } else if (message.startsWith('+OUT.COUNT')) {
      this.state.outputs = parseInt(message.split(' ')[1], 10);
      this.log('info', `Output count set to ${this.state.outputs}`);
    } else if (message.startsWith('+IN-')) {
      const parts = message.split(' ');
      const key = parts[0].split('.')[0].split('-')[1];
      if (message.includes('.NAME')) {
        this.state.inputNames[key] = parts.slice(1).join(' ').replace(/"/g, '');
        this.log('info', `Input ${key} name set to ${this.state.inputNames[key]}`);
      } else if (message.includes('.SENS')) {
        this.state.inputSensitivities[key] = parts[1].replace(/"/g, '');
        this.log('info', `Input ${key} sensitivity set to ${this.state.inputSensitivities[key]}`);
      } else if (message.includes('.GAIN')) {
        const gain = parseFloat(parts[1]);
        this.state.inputGains[key] = gain;
        if (key === '400') {
          this.state.generatorGain = gain;
          this.log('info', `Generator gain set to ${gain} dB`);
        } else {
          this.log('info', `Input ${key} trim set to ${gain} dB`);
        }
      } else if (message.includes('.STEREO')) {
        this.state.stereoPairs[key] = parts[1] === '1';
        this.log('info', `Input ${key} stereo: ${this.state.stereoPairs[key]}`);
      }
      this.updatePresets();
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