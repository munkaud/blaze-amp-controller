const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const socket = require('./lib/socket');
const poller = require('./lib/poller');
const parseResponse = require('./lib/parser');
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
    super(internal);
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
  }

  async init(config) {
    this.config = config;
    this.log('debug', 'Initializing instance');
    this.setActionDefinitions(actions(this));
    this.setFeedbackDefinitions(feedbacks(this));
    socket.initSocket(this);
  }

  async configUpdated(config) {
    this.config = config;
    socket.initSocket(this);
    poller.pollConfig(this); // Refresh config on update
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Target IP', width: 8, default: '192.168.1.100' },
      { type: 'number', id: 'port', label: 'Target Port', width: 4, default: 9999, min: 1, max: 65535 },
    ];
  }

  updatePresets() {
    this.log('debug', 'Running updatePresets');
    this.setPresetDefinitions([
      ...powerPresets(this),
      ...setupPresets(this),
      ...inputPresets(this),
      ...digitalPresets(this),
      ...zonePresets(this),
      ...outputPresets(this),
    ]);
  }

  async destroy() {
    socket.destroySocket(this);
    this.log('info', 'Instance destroyed');
  }
}

runEntrypoint(BlazeAudioInstance, []);