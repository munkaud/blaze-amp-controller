try {
  const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base');
  if (!InstanceBase) {
    throw new Error('InstanceBase is undefined - check @companion-module/base installation');
  }

  const inputParser = require('./lib/input_parser');
  const outputParser = require('./lib/output_parser');
  const zoneParser = require('./lib/zone_parser');
  const configParser = require('./lib/module_config');
  const messageParser = require('./lib/message_parser');
  const tcp = require('./lib/module_tcp');
  const setupActions = require('./actions/setup_actions');

  class BlazeAmpController extends InstanceBase {
    init() {
      console.log('Initializing BlazeAmpController');
      try {
        this.socket = null;
        this.responseBuffer = '';
        this.config = { ...configParser.getDefaultConfig(), ...this.config };
        this.updateStatus(InstanceStatus.Connecting);
        const actionDefs = setupActions.getActions(this);
        this.setActionDefinitions(actionDefs);
        console.log('Action definitions set completed');
        this.setupFeedback();
        this.connectToAmp();
        this.setupPresets();
        console.log('Presets set completed');
        this.updateStatus(InstanceStatus.Ok);
      } catch (err) {
        console.error(`Init error: ${err.message}`);
        this.updateStatus(InstanceStatus.Error, err.message);
        throw err;
      }
    }

    configFields() {
      return configParser.getConfigFields();
    }

    getConfigFields() {
      return configParser.getConfigFields();
    }

    updateConfig(config) {
      console.log('Updating config');
      this.config = { ...configParser.getDefaultConfig(), ...config };
      this.connectToAmp();
      this.updateStatus(InstanceStatus.Ok);
    }

    setupPresets() {
      console.log('Setting up presets');
      const debugPresetsFn = require('./preset_defs/debug');
      const debugPresetsArray = debugPresetsFn(this);
      console.log('Debug presets array:', JSON.stringify(debugPresetsArray, null, 2));
      console.log('Instance context:', this.config);

      const debugPresets = debugPresetsArray.reduce((acc, preset, i) => {
        const id = i === 0 ? 'getConfig' : 'sendCommand';
        return { ...acc, [id]: preset };
      }, {});

      console.log('Debug presets object:', JSON.stringify(debugPresets, null, 2));

      const validatedPresets = {};
      for (const [id, preset] of Object.entries(debugPresets)) {
        if (!preset.category || !preset.name || !preset.style || !preset.steps) {
          console.error(`Invalid preset ${id}: Missing required fields`);
          continue;
        }
        if (!Array.isArray(preset.steps) || preset.steps.length === 0) {
          console.error(`Invalid preset ${id}: Steps must be a non-empty array`);
          continue;
        }
        for (const step of preset.steps) {
          if (!step.down || !Array.isArray(step.down)) {
            console.error(`Invalid preset ${id}: Step missing down array`);
            continue;
          }
          for (const action of step.down) {
            if (!(action.actionId || action.action) || !action.options) {
              console.error(`Invalid preset ${id}: Action missing actionId/action or options`);
              continue;
            }
          }
        }
        validatedPresets[id] = preset;
      }

      if (Object.keys(validatedPresets).length === 0) {
        console.error('No valid presets to register');
        return;
      }

      setTimeout(() => {
        this.setPresetDefinitions(validatedPresets);
        console.log(`Presets registered with setPresetDefinitions: ${Object.keys(validatedPresets).length} presets`);
      }, 1000);
    }

    connectToAmp() {
      tcp.createConnection(this);
    }

    handleCommand(command, value) {
      console.log(`Handling command: ${command}, value: ${value}`);
      if (command.startsWith('ZONE-')) {
        const method = command.startsWith('GET') ? 'GET' : 'SET';
        const result = zoneParser.handle(command, value, method);
        if (result.error) {
          console.log(`Zone error: ${result.error}`);
          return;
        }
        this.sendCommand(`${result.cmd}\r\n`);
      } else if (command.startsWith('IN-')) {
        const result = inputParser.handle(command, value);
        if (result.cmd) this.sendCommand(`${result.cmd}\r\n`);
      } else if (command.startsWith('OUT-')) {
        const result = outputParser.handle(command, value);
        if (result.cmd) this.sendCommand(`${result.cmd}\r\n`);
      } else if (command === 'POWER_ON' || command === 'POWER_OFF') {
        this.sendCommand(`${command}\r\n`);
      } else if (command.startsWith('GET SYSTEM.DEVICE')) {
        this.sendCommand(`${command}\r\n`);
      }
    }

    onResponse(response) {
      console.log(`Received: ${response}`);
      const parsed = messageParser.parse(response);
      if (parsed.type === 'compressor' || parsed.type === 'ducker' || parsed.type === 'zone') {
        this.setVariableValues({ [`${parsed.type}_${parsed.param.toLowerCase()}`]: parsed.value });
        console.log(`Set ${parsed.type}_${parsed.param.toLowerCase()} to ${parsed.value}`);
      } else if (parsed.type === 'system') {
        this.setVariableValues({ [`system_${parsed.param.toLowerCase()}`]: parsed.value });
        console.log(`Set system_${parsed.param.toLowerCase()} to ${parsed.value}`);
      } else if (parsed.type === 'success') {
        console.log('Command succeeded');
        this.setVariableValues({ last_command_status: 'success' });
      } else if (parsed.type === 'error') {
        console.log(`Error: ${parsed.code}`);
        this.setVariableValues({ last_command_status: `error_${parsed.code}` });
      } else {
        console.log(`Unknown response: ${response}`);
      }
    }

    sendCommand(cmd) {
      tcp.sendCommand(this, cmd);
    }

    setupFeedback() {
      console.log('Setting up feedback');
      this.setFeedbackDefinitions({
        powerState: {
          type: 'advanced',
          label: 'Power State',
          options: [],
          callback: () => {
            const state = this.getVariable('power_state') || 'OFF';
            return {
              text: state === 'ON' ? '✓ ON' : 'OFF',
              bgcolor: state === 'ON' ? 0x00FF00 : 0xFF0000
            };
          }
        },
        connectionState: {
          type: 'advanced',
          label: 'Connection State',
          options: [],
          callback: () => {
            const state = this.getVariable('connection_state') || 'disconnected';
            return {
              text: state === 'connected' ? '✓ Connected' : 'Disconnected',
              bgcolor: state === 'connected' ? 0x00FF00 : 0xFF0000
            };
          }
        }
      });
    }

    destroy() {
      tcp.destroy(this);
      console.log('Module destroyed');
    }
  }

  runEntrypoint(BlazeAmpController, []);
} catch (err) {
  console.error(`Module load error: ${err.message}`);
  throw err;
}