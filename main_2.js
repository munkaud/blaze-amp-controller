const { InstanceBase, InstanceStatus, TCPHelper } = require('@companion-module/base');
console.log('Loading main.js'); // Top-level check
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const powerPresets = require('./presets/power');
const setupPresets = require('./presets/setup');
const inputPresets = require('./presets/inputs');
const digitalPresets = require('./presets/digitals');
const zonePresets = require('./presets/zones');
const outputPresets = require('./presets/outputs');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    console.log('Constructor start'); // Before super
    super(internal);
    console.log('Constructor post-super'); // After super
    this.socket = null;
    this.state = { 
      power: 'unknown', 
      inputs: 0, 
      zones: 0, 
      outputs: 0, 
      inputNames: {}, 
      inputSensitivities: {}, 
      inputGains: {}, 
      generatorGain: null, 
      stereoPairs: {},
      zoneLinks: {},
      zoneInputs: {},
      zoneOutputs: {},
      zoneNames: {},
      zoneGains: {},
      zoneGainRanges: {},
      outputNames: {},
    };
    this.initialized = false;
    console.log('Constructor complete'); // End of constructor
  }

  async init(config) {
    this.config = config;
    this.log('debug', 'Initializing instance');
    this.setActionDefinitions(actions(this));
    this.setFeedbackDefinitions(feedbacks(this));
    this.initSocket();
  }

  async configUpdated(config) {
    this.config = config;
    this.initSocket();
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Target IP', width: 8, default: '192.168.1.100' },
      { type: 'number', id: 'port', label: 'Target Port', width: 4, default: 9999, min: 1, max: 65535 },
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
      this.log('debug', 'Sending: GET ZONE.COUNT\\n');
      this.socket.send('GET ZONE.COUNT\n');
      this.log('debug', 'Sending: GET OUT.COUNT\\n');
      this.socket.send('GET OUT.COUNT\n');
    });
    this.socket.on('data', (data) => {
      const messages = data.toString().trim().split('\n');
      messages.forEach(message => {
        this.log('debug', `Received: ${message}`);
        this.parseResponse(message);
      });
      if (!this.initialized && this.state.inputs > 0 && this.state.zones > 0 && this.state.outputs > 0) {
        this.initialized = true;
        this.log('debug', 'Polling complete, updating presets'); // Debug
        this.updatePresets();
        this.log('info', 'Initial polling complete, presets updated');
      }
    });
    this.socket.on('error', (err) => {
      this.updateStatus(InstanceStatus.ConnectionFailure);
      this.log('error', `Socket error: ${err.message}`);
    });
  }

  updatePresets() {
    this.log('debug', 'Running updatePresets'); // Debug
    this.setPresetDefinitions([
      ...powerPresets(this),
      ...setupPresets(this),
      ...inputPresets(this),
      ...digitalPresets(this),
      ...zonePresets(this),
      ...outputPresets(this),
    ]);
  }

  parseResponse(message) {
    if (message.startsWith('#GET POWER')) {
      this.state.power = 'OFF';
      this.log('info', 'Power state assumed OFF');
      this.checkFeedbacks('powerOnState', 'powerOffState');
    } else if (message.startsWith('+POWER')) {
      this.state.power = message.includes('ON') ? 'ON' : 'OFF';
      this.log('info', `Power state set to ${this.state.power}`);
      this.checkFeedbacks('powerOnState', 'powerOffState');
    } else if (message.startsWith('+IN.COUNT')) {
      this.state.inputs = parseInt(message.split(' ')[1], 10);
      this.log('info', `Input count set to ${this.state.inputs}`);
      const primaryIids = [100, 102, 200, 400];
      primaryIids.forEach(iid => {
        this.socket.send(`GET IN-${iid}.NAME\n`);
        this.socket.send(`GET IN-${iid}.GAIN\n`);
        if (iid !== 400) this.socket.send(`GET IN-${iid}.STEREO\n`);
        if (iid === 100 || iid === 102) this.socket.send(`GET IN-${iid}.SENS\n`);
      });
      const secondaryIids = [101, 103, 201];
      secondaryIids.forEach(iid => {
        this.socket.send(`GET IN-${iid}.NAME\n`);
        if (iid === 101 || iid === 103) {
          this.socket.send(`GET IN-${iid}.SENS\n`);
          this.socket.send(`GET IN-${iid}.GAIN\n`);
        }
      });
    } else if (message.startsWith('+ZONE.COUNT')) {
      this.state.zones = parseInt(message.split(' ')[1], 10);
      this.log('info', `Zone count set to ${this.state.zones}`);
      for (let zid = 1; zid <= this.state.zones; zid++) {
        this.socket.send(`GET ZONE-${zid}.STEREO\n`);
        this.socket.send(`GET ZONE-${zid}.PRIMARY_SRC\n`);
        this.socket.send(`GET ZONE-${zid}.GAIN\n`);
        this.socket.send(`GET ZONE-${zid}.GAIN_MIN\n`);
        this.socket.send(`GET ZONE-${zid}.GAIN_MAX\n`);
        this.socket.send(`GET ZONE-${zid}.NAME\n`);
      }
    } else if (message.startsWith('+OUT.COUNT')) {
      this.state.outputs = parseInt(message.split(' ')[1], 10);
      this.log('info', `Output count set to ${this.state.outputs}`);
      for (let oid = 1; oid <= this.state.outputs; oid++) {
        this.socket.send(`GET OUT-${oid}.SOURCE\n`);
        this.socket.send(`GET OUT-${oid}.NAME\n`);
      }
    } else if (message.startsWith('+IN-')) {
      const parts = message.split(' ');
      const iid = parts[0].split('.')[0].split('-')[1];
      if (message.includes('.NAME')) {
        const name = parts.slice(1).join(' ').replace(/"/g, '');
        this.state.inputNames[iid] = name;
        this.log('info', `Input ${iid} name set to ${name}`);
      } else if (message.includes('.GAIN')) {
        const gain = parseFloat(parts[1]);
        if (iid === '400') {
          this.state.generatorGain = gain;
          this.log('info', `Generator gain set to ${gain} dB`);
        } else {
          this.state.inputGains[iid] = gain;
          this.log('info', `Input ${iid} trim set to ${gain} dB`);
        }
      } else if (message.includes('.STEREO')) {
        this.state.stereoPairs[iid] = parts[1] === '1';
        this.log('info', `Input ${iid} stereo: ${this.state.stereoPairs[iid]}`);
      } else if (message.includes('.SENS')) {
        const sens = parts[1].replace(/"/g, '');
        this.state.inputSensitivities[iid] = sens;
        this.log('info', `Input ${iid} sensitivity set to ${sens}`);
      }
    } else if (message.startsWith('+ZONE-')) {
      const parts = message.split(' ');
      const zid = parts[0].split('.')[0].split('-')[1];
      if (message.includes('.STEREO')) {
        this.state.zoneLinks[zid] = parts[1] === '1';
        this.log('info', `Zone ${zid} set to ${parts[1] === '1' ? 'stereo' : 'mono'}`);
      } else if (message.includes('.PRIMARY_SRC')) {
        const inputId = parseInt(parts[1], 10);
        this.state.zoneInputs[zid] = inputId;
        this.log('info', `Zone ${zid} primary source set to ${inputId}`);
      } else if (message.includes('.GAIN')) {
        const gain = parseFloat(parts[1]);
        this.state.zoneGains[zid] = gain;
        this.log('info', `Zone ${zid} gain set to ${gain} dB`);
      } else if (message.includes('.GAIN_MIN')) {
        const min = parseFloat(parts[1]);
        this.state.zoneGainRanges[zid] = { ...this.state.zoneGainRanges[zid], min };
        this.log('info', `Zone ${zid} gain min set to ${min} dB`);
      } else if (message.includes('.GAIN_MAX')) {
        const max = parseFloat(parts[1]);
        this.state.zoneGainRanges[zid] = { ...this.state.zoneGainRanges[zid], max };
        this.log('info', `Zone ${zid} gain max set to ${max} dB`);
      } else if (message.includes('.NAME')) {
        const name = parts.slice(1).join(' ').replace(/"/g, '');
        this.state.zoneNames[zid] = name;
        this.log('info', `Zone ${zid} name set to ${name}`);
      }
    } else if (message.startsWith('+OUT-')) {
      const parts = message.split(' ');
      const oid = parts[0].split('.')[0].split('-')[1];
      if (message.includes('.SOURCE')) {
        const [zoneStr, channel] = parts[1].split('.');
        const zid = parseInt(zoneStr.split('-')[1], 10);
        this.state.zoneOutputs[oid] = { zone: zid, channel };
        this.log('info', `Output ${oid} sourced from Zone ${zid} ${channel}`);
      } else if (message.includes('.NAME')) {
        const name = parts.slice(1).join(' ').replace(/"/g, '');
        this.state.outputNames[oid] = name;
        this.log('info', `Output ${oid} name set to ${name}`);
      }
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

module.exports = BlazeAudioInstance;