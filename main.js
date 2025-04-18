const { InstanceBase, runEntrypoint, TCPHelper } = require('@companion-module/base');
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const debug = require('./preset_defs/debug');
const digitals = require('./preset_defs/digitals');
const inputs = require('./preset_defs/inputs');
const registers = require('./preset_defs/registers');
const zone_settings = require('./preset_defs/zone_settings');
const zone_duck = require('./preset_defs/zone_duck');
const zone_compress = require('./preset_defs/zone_compress');
const subscriptions = require('./preset_defs/subscriptions');
const controls = require('./preset_defs/controls');
const zone_linking = require('./preset_defs/zone_linking');

class BlazeAmpInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
  }

  async init(config) {
    this.config = config;
    this.state = {
      inputNames: {},
      inputGains: {},
      stereoPairs: {},
      generatorGain: 0,
      zones: [], // Initialize empty, populate dynamically
      zoneLinks: {},
      inputs: [],
      outputs: [],
      power: 'OFF',
    };

    this.updateActions();
    this.updateFeedbacks();
    this.updatePresets();
    this.initTCP();
  }

  async destroy() {
    if (this.socket) {
      this.socket.destroy();
    }
    this.log('debug', 'destroyed');
  }

  async configUpdated(config) {
    this.config = config;
    this.initTCP();
  }

  getConfigFields() {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'Target IP',
        width: 8,
        default: '192.168.12.180',
      },
      {
        type: 'textinput',
        id: 'port',
        label: 'Target Port',
        width: 4,
        default: '7621',
      },
    ];
  }

  updateActions() {
    this.setActionDefinitions(actions(this));
  }

  updateFeedbacks() {
    this.setFeedbackDefinitions(feedbacks(this));
  }

  updatePresets() {
    const presets = [
      ...debug(this),
      ...digitals(this),
      ...inputs(this),
      ...registers(this),
      ...zone_settings(this),
      ...zone_duck(this),
      ...zone_compress(this),
      ...subscriptions(this),
      ...controls(this),
      ...zone_linking(this),
    ];
    this.setPresetDefinitions(presets);
  }

  initTCP() {
    if (this.socket) {
      this.socket.destroy();
      delete this.socket;
    }

    if (this.config.host && this.config.port) {
      this.socket = new TCPHelper(this.config.host, this.config.port);

      this.socket.on('connect', () => {
        this.updateStatus('ok');
        this.log('info', 'Connected to Blaze Amp');
        // Poll configuration
        this.socket.send('CONFIG\n');
        this.socket.send('SYSTEM.INPUTS\n');
        this.socket.send('SYSTEM.OUTPUTS\n');
        this.socket.send('GET ZONE.COUNT\n');
      });

      this.socket.on('error', (err) => {
        this.updateStatus('error', 'TCP Error');
        this.log('error', `TCP Error: ${err.message}`);
      });

      this.socket.on('data', (data) => {
        const msg = data.toString('utf8').trim();
        this.log('debug', `Received: ${msg}`);
        if (msg.includes('ZONE') && !msg.includes('ZONE.COUNT')) {
          this.setVariableValues({ [`zone_status`]: msg });
        }
        if (msg.includes('SYSTEM.STATUS.POWER')) {
          const powerState = msg.includes('ON') ? 'ON' : 'OFF';
          this.state.power = powerState;
          this.checkFeedbacks('power_state');
        }
        if (msg.includes('CONFIG')) {
          // Parse CONFIG for zones (example, adjust based on actual response)
          const zoneMatches = msg.match(/ZONE-[A-H]/g) || [];
          this.state.zones = [...new Set(zoneMatches)];
          if (!this.state.zones.length) {
            // Fallback to model-based zone count
            this.socket.send('GET ZONE.COUNT\n');
          } else {
            this.state.zones.forEach((zone) => {
              this.socket.send(`GET ${zone}.LINK\n`);
            });
          }
        }
        if (msg.includes('ZONE.COUNT')) {
          const count = parseInt(msg.split('"')[1]) || 4; // Default to 4 for 1004
          this.state.zones = Array.from({ length: count }, (_, i) => `ZONE-${String.fromCharCode(65 + i)}`);
          this.state.zones.forEach((zone) => {
            this.socket.send(`GET ${zone}.LINK\n`);
          });
        }
        if (msg.includes('.LINK')) {
          const [cmd, zone, link] = msg.split(' ');
          this.state.zoneLinks[zone] = link || null;
        }
        if (msg.includes('SYSTEM.INPUTS')) {
          // Example: +SYSTEM.INPUTS "MIC1,LINE1,MIX1"
          const inputs = msg.split('"')[1]?.split(',') || [];
          this.state.inputs = inputs;
        }
        if (msg.includes('SYSTEM.OUTPUTS')) {
          // Example: +SYSTEM.OUTPUTS "OUT1,OUT2,OUT3,OUT4"
          const outputs = msg.split('"')[1]?.split(',') || [];
          this.state.outputs = outputs;
        }
      });
    } else {
      this.updateStatus('bad_config');
      this.log('error', 'Configuration incomplete');
    }
  }
}

runEntrypoint(BlazeAmpInstance, []);