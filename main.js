const { InstanceBase, runEntrypoint, TCPHelper } = require('@companion-module/base');
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const debug = require('./preset_defs/debug');
const digitals = require('./preset_defs/digitals');
const inputs = require('./preset_defs/inputs');
const inputs_generator = require('./preset_defs/inputs_generator');
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
      zones: [],
      zoneLinks: {},
      zoneStereo: {},
      inputs: [],
      outputs: [],
      power: 'OFF',
    };

    this.updateActions();
    this.updateFeedbacks();
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
      ...inputs_generator(this),
      ...registers(this),
      ...zone_settings(this),
      ...zone_duck(this),
      ...zone_compress(this),
      ...subscriptions(this),
      ...controls(this),
      ...zone_linking(this),
    ];
    this.log('debug', `Updating presets with zones: ${JSON.stringify(this.state.zones)}, zoneLinks: ${JSON.stringify(this.state.zoneLinks)}`);
    this.setPresetDefinitions(presets);
  }

  initTCP() {
    if (this.socket) {
      this.socket.destroy();
      delete this.socket;
    }

    if (this.config.host && this.config.port) {
      this.socket = new TCPHelper(this.config.host, this.config.port);
      let expectedResponses = 8; // API_VERSION, POWER_ON, MODEL_NAME, SIGNAL_IN, SIGNAL_OUT, ZONE.COUNT, IN.COUNT, OUT.COUNT
      let receivedResponses = 0;
      let stereoQueriesSent = 0;
      let stereoResponsesReceived = 0;

      this.socket.on('connect', () => {
        this.updateStatus('ok');
        this.log('info', 'Connected to Blaze Amp');
        this.socket.send('GET API_VERSION\n');
        setTimeout(() => {
          this.socket.send('POWER_ON\n');
          this.socket.send('GET SYSTEM.DEVICE.MODEL_NAME\n');
          this.socket.send('GET SYSTEM.STATUS.SIGNAL_IN\n');
          this.socket.send('GET SYSTEM.STATUS.SIGNAL_OUT\n');
          this.socket.send('GET ZONE.COUNT\n');
          this.socket.send('GET IN.COUNT\n');
          this.socket.send('GET OUT.COUNT\n');
        }, 1000);
      });

      this.socket.on('error', (err) => {
        this.updateStatus('error', 'TCP Error');
        this.log('error', `TCP Error: ${err.message}`);
      });

      this.socket.on('data', (data) => {
        const msg = data.toString('utf8').trim();
        this.log('debug', `Received: ${msg}`);
        receivedResponses++;

        // Split multi-line responses
        const lines = msg.split('\n').filter(line => line.trim());
        lines.forEach((line, index) => {
          this.log('debug', `Processing line ${index + 1}/${lines.length}: ${line}`);

          // Skip echoed commands
          if (line.startsWith('*GET')) {
            return;
          }

          if (line.includes('ZONE') && !line.includes('ZONE.COUNT') && !line.includes('STEREO')) {
            this.setVariableValues({ [`zone_status`]: line });
          }
          if (line.includes('SYSTEM.STATUS.POWER')) {
            const powerState = line.includes('ON') ? 'ON' : 'OFF';
            this.state.power = powerState;
            this.checkFeedbacks('power_state');
          }
          if (line.includes('SYSTEM.DEVICE.MODEL_NAME')) {
            const model = line.split('"')[1] || 'Unknown';
            this.state.model = model;
          }
          if (line.includes('ZONE.COUNT')) {
            const count = parseInt(line.split('"')[1]) || 4;
            this.state.zones = Array.from({ length: count }, (_, i) => `ZONE-${String.fromCharCode(65 + i)}`);
            const primaryZones = this.state.zones.filter((_, i) => i % 2 === 0);
            stereoQueriesSent = primaryZones.length;
            expectedResponses += stereoQueriesSent;
            primaryZones.forEach((zone) => {
              this.socket.send(`GET ${zone}.STEREO\n`);
            });
          }
          if (line.includes('IN.COUNT')) {
            const count = parseInt(line.split('"')[1]) || 4;
            this.state.inputs = Array.from({ length: count }, (_, i) => `IN-${100 + i}`);
          }
          if (line.includes('OUT.COUNT')) {
            const count = parseInt(line.split('"')[1]) || 4;
            this.state.outputs = Array.from({ length: count }, (_, i) => `OUT-${1 + i}`);
          }
          if (line.includes('.STEREO')) {
            const stereoMatch = line.match(/\+(ZONE-[A-Z])\.STEREO ([0-1])/);
            this.log('debug', `STEREO match: ${JSON.stringify(stereoMatch)}`);
            if (stereoMatch && stereoMatch[1] && stereoMatch[2] !== undefined) {
              const zone = stereoMatch[1];
              const value = parseInt(stereoMatch[2]);
              this.state.zoneStereo[zone] = value;
              const zoneIndex = this.state.zones.indexOf(zone);
              if (zoneIndex >= 0 && zoneIndex % 2 === 0 && zoneIndex + 1 < this.state.zones.length) {
                const secondaryZone = this.state.zones[zoneIndex + 1];
                this.state.zoneLinks[secondaryZone] = value === 1 ? zone : null;
                this.state.zoneStereo[secondaryZone] = 0;
                this.log('debug', `Set zoneLinks: ${JSON.stringify(this.state.zoneLinks)}`);
                stereoResponsesReceived++;
              }
            } else {
              this.log('warn', `Invalid STEREO response format: ${line}`);
            }
          }
          if (line.includes('SYSTEM.STATUS.SIGNAL_IN')) {
            const inputs = line.split('"')[1]?.split(',') || [];
            if (!this.state.inputs.length) {
              this.state.inputs = inputs;
            }
          }
          if (line.includes('SYSTEM.STATUS.SIGNAL_OUT')) {
            const outputs = line.split('"')[1]?.split(',') || [];
            if (!this.state.outputs.length) {
              this.state.outputs = outputs;
            }
          }
        });

        // Trigger presets update after all STEREO responses
        if (stereoQueriesSent > 0 && stereoResponsesReceived >= stereoQueriesSent) {
          this.log('debug', `All STEREO responses received, updating presets`);
          this.updatePresets();
        }
      });

      // Timeout to prevent hanging
      setTimeout(() => {
        if (stereoQueriesSent === 0 || stereoResponsesReceived < stereoQueriesSent) {
          this.log('warn', `Timeout waiting for STEREO responses, proceeding with presets (received ${stereoResponsesReceived}/${stereoQueriesSent})`);
          this.updatePresets();
        }
      }, 5000);
    } else {
      this.updateStatus('bad_config');
      this.log('error', 'Configuration incomplete');
    }
  }
}

runEntrypoint(BlazeAmpInstance, []);
