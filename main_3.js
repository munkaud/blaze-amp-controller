const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const EventEmitter = require('events');
const socket = require('./lib/socket');
const parseResponse = require('./lib/parser');
const actions = require('./actions/og_actions');
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
    Object.assign(this, EventEmitter.prototype);
    EventEmitter.call(this);
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
    this.updatePresetsDebounced = this.debounce(this.updatePresets.bind(this), 250);
    this.pollingComplete = false;
    this.connected = false; // Guard connect message
  }

  async init(config) {
    this.config = config;
    this.log('debug', 'Initializing instance');
    this.setActionDefinitions(actions(this));
    this.setFeedbackDefinitions(feedbacks(this));
    
    socket.initSocket(this);
    
    this.once('socket_connected', () => {
      if (!this.connected) {
        this.log('info', 'Connected to Blaze Audio amplifier');
        this.connected = true;
        this.startPolling();
      }
    });

    this.on('update_state', () => {
      if (this.pollingComplete) {
        this.updatePresetsDebounced();
      }
    });
  }

  startPolling() {
    this.log('debug', 'Starting full polling');
    const commands = [
      'GET SYSTEM.STATUS.STATE\n',
      'GET IN.COUNT\n',
      'GET ZONE.COUNT\n',
      'GET OUT.COUNT\n',
    ];
    const zoneMap = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' };
    let zid = 1;
    while (zid <= 4) {
      const zoneLetter = zoneMap[zid];
      const isPrimary = zid === 1 || zid === 3;
      const isStereo = isPrimary && this.state.zoneLinks[zid] === 1;
      if (isPrimary) {
        commands.push(`GET ZONE-${zoneLetter}.STEREO\n`);
      }
      if (!isStereo || isPrimary) { // Skip secondary if primary is stereo
        commands.push(`GET ZONE-${zoneLetter}.NAME\n`);
        commands.push(`GET ZONE-${zoneLetter}.GAIN\n`);
      }
      zid = isStereo ? zid + 2 : zid + 1;
    }
  
    let delay = 0;
    commands.forEach(cmd => {
      setTimeout(() => this.socket.send(cmd), delay);
      delay += 100;
    });
  
    setTimeout(() => {
      this.pollingComplete = true;
      this.updatePresetsDebounced();
      this.setFeedbackDefinitions(feedbacks(this)); // Re-register feedbacks
      this.checkFeedbacks();
    }, delay + 500);

    this.on('update_state', () => {
      if (this.pollingComplete) {
        this.log('debug', 'update_state triggered, running updatePresetsDebounced');
        this.updatePresetsDebounced();
        this.log('debug', 'update_state triggered, running checkFeedbacks');
        this.checkFeedbacks();
      }
    });
  }

  async configUpdated(config) {
    this.config = config;
    socket.initSocket(this);
    if (!this.connected) {
      //this.log('info', 'Config updated, starting polling');
      this.connected = true;
      this.startPolling();
    }
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Target IP', width: 8, default: '192.168.1.100' },
      { type: 'number', id: 'port', label: 'Target Port', width: 4, default: 9999, min: 1, max: 65535 },
    ];
  }

  updatePresets() {
    //this.log('debug', 'Running updatePresets');
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

  debounce(fn, ms) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), ms);
    };
  }
}

runEntrypoint(BlazeAudioInstance, []);