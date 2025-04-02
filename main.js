const { InstanceBase, InstanceStatus, TCPHelper, runEntrypoint } = require('@companion-module/base');
const powerPresets = require('./presets/power');
const setupPresets = require('./presets/setup');
const inputPresets = require('./presets/inputs');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.socket = null;
    this.state = { power: 'unknown', inputs: 0, zones: 0, outputs: 0, inputNames: {} };
  }

  async init(config) {
    this.config = config;
    this.initSocket();
    this.setActionDefinitions({
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.log('debug', 'Sending: GET IN.COUNT\\n');
            this.socket.send('GET IN.COUNT\n');
            this.log('debug', 'Sending: GET ZONE.COUNT\\n');
            this.socket.send('GET ZONE.COUNT\n');
            this.log('debug', 'Sending: GET OUT.COUNT\\n');
            this.socket.send('GET OUT.COUNT\n');
            this.log('info', 'Requested amp configuration');
          } catch (err) {
            this.log('error', `Failed to request config: ${err.message}`);
          }
        },
      },
      muteInput: {
        name: 'Mute Input',
        options: [
          { type: 'number', label: 'Input ID', id: 'inputId', default: 1, min: 1, max: 10 },
          { type: 'checkbox', label: 'Mute', id: 'mute', default: true },
        ],
        callback: async ({ options }) => {
          if (!this.socket) return this.log('error', 'Socket not connected');
          try {
            const cmd = options.mute ? `MUTE_ON ${options.inputId}\n` : `MUTE_OFF ${options.inputId}\n`;
            this.socket.send(cmd);
            this.log('info', `${options.mute ? 'Muted' : 'Unmuted'} input ${options.inputId}`);
          } catch (err) {
            this.log('error', `Failed to mute input: ${err.message}`);
          }
        },
      },
      setInputGain: {
        name: 'Set Input Gain',
        options: [
          { type: 'number', label: 'Input ID', id: 'inputId', default: 1, min: 1, max: 10 },
          { type: 'number', label: 'Gain (dB)', id: 'gain', default: 0, min: -100, max: 12 },
        ],
        callback: async ({ options }) => {
          if (!this.socket) return this.log('error', 'Socket not connected');
          try {
            this.socket.send(`SET INPUT_GAIN ${options.inputId} ${options.gain}\n`);
            this.log('info', `Set gain for input ${options.inputId} to ${options.gain} dB`);
          } catch (err) {
            this.log('error', `Failed to set gain: ${err.message}`);
          }
        },
      },
  getInputName: { // New action
    name: 'Get Input Name',
    options: [
      { type: 'number', label: 'Input IID', id: 'iid', default: 100, min: 100, max: 400 },
    ],
    callback: async ({ options }) => {
      if (!this.socket) return this.log('error', 'Socket not connected');
      try {
        this.log('debug', `Sending: GET IN-${options.iid}.NAME\\n`);
        this.socket.send(`GET IN-${options.iid}.NAME\n`);
      } catch (err) {
        this.log('error', `Failed to get input name: ${err.message}`);
      }
    }
  },
      powerOffState: {
        type: 'advanced',
        name: 'Power Off Indicator',
        description: 'Show checkmark when amp is off',
        options: [],
        callback: () => {
          if (this.state.power === 'off') {
            return { text: 'Power Off ✓', bgcolor: 9109504 };
          }
          return { text: 'Power Off', bgcolor: 0, color: 8421504 };
        },
      },
      inputMuteState: {
        type: 'advanced',
        name: 'Input Mute State',
        description: 'Show mute status for an input',
        options: [
          { type: 'number', label: 'Input ID', id: 'inputId', default: 1, min: 1, max: 10 },
        ],
        callback: ({ options }) => {
          return { bgcolor: 0 }; // Placeholder
        },
      },
    });
    this.setPresetDefinitions([...powerPresets(this), ...setupPresets(this), ...inputPresets(this)]);
  }

  // Rest of main.js unchanged: configUpdated, getConfigFields, initSocket, parseResponse, destroy

  async configUpdated(config) {
    this.config = config;
    this.initSocket();
  }

  async configUpdated(config) {
    this.config = config;
    this.initSocket();
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Amplifier IP Address', width: 6, default: '192.168.12.180' }, // Updated IP
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
    } else if (message.startsWith('+ZONE.COUNT')) {
      this.state.zones = parseInt(message.split(' ')[1], 10);
      this.log('info', `Zone count set to ${this.state.zones}`);
    } else if (message.startsWith('+OUT.COUNT')) {
      this.state.outputs = parseInt(message.split(' ')[1], 10);
      this.log('info', `Output count set to ${this.state.outputs}`);
    } else if (message.startsWith('+IN-')) {
      const parts = message.split(' ');
      const iid = parts[0].split('-')[1].split('.')[0];
      this.state.inputNames[iid] = parts.slice(1).join(' ');
      this.log('info', `Input ${iid} name set to ${this.state.inputNames[iid]}`);
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