try {
  const { InstanceBase, runEntrypoint } = require('@companion-module/base');
  if (!InstanceBase) {
    throw new Error('InstanceBase is undefined - check @companion-module/base installation');
  }

  const inputParser = require('./lib/input_parser');
  const outputParser = require('./lib/output_parser');
  const zoneParser = require('./lib/zone_parser');
  const configParser = require('./lib/module_config');
  const messageParser = require('./lib/message_parser');

  class BlazeAmpController extends InstanceBase {
    init() {
      console.log('Initializing BlazeAmpController');
      this.config = { ...configParser.getDefaultConfig(), ...this.config };
      this.setupActions();
      this.setupFeedback();
      this.connectToAmp();
    }

    connectToAmp() {
      console.log(`Connecting to amp at ${this.config.host}:${this.config.port}`);
      // Your TCP logic (e.g., net.Socket)
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
        this.setVariable(`${parsed.type}_${parsed.param.toLowerCase()}`, parsed.value);
        console.log(`Set ${parsed.type}_${parsed.param.toLowerCase()} to ${parsed.value}`);
      } else if (parsed.type === 'system') {
        this.setVariable(`system_${parsed.param.toLowerCase()}`, parsed.value);
        console.log(`Set system_${parsed.param.toLowerCase()} to ${parsed.value}`);
      } else if (parsed.type === 'success') {
        console.log('Command succeeded');
      } else if (parsed.type === 'error') {
        console.log(`Error: ${parsed.code}`);
      } else {
        console.log(`Unknown response: ${response}`);
      }
    }

    sendCommand(cmd) {
      console.log(`Sending: ${cmd}`);
      // Your TCP logic
    }

    setupActions() {
      this.setActionDefinitions({
        getConfig: {
          label: 'Get Config',
          options: [],
          callback: () => {
            try {
              const configActions = require('./actions/config_actions');
              configActions.getConfig.call(this);
            } catch (err) {
              console.log(`getConfig error: ${err.message}`);
            }
          }
        },
        powerOn: {
          label: 'Power On',
          options: [],
          callback: () => {
            try {
              const powerActions = require('./actions/power_actions');
              powerActions.powerOn.call(this);
            } catch (err) {
              console.log(`powerOn error: ${err.message}`);
            }
          }
        },
        powerOff: {
          label: 'Power Off',
          options: [],
          callback: () => {
            try {
              const powerActions = require('./actions/power_actions');
              powerActions.powerOff.call(this);
            } catch (err) {
              console.log(`powerOff error: ${err.message}`);
            }
          }
        },
        sendCommand: {
          label: 'Send Raw Command',
          options: [
            { type: 'textinput', label: 'Command', id: 'command', default: 'SET ZONE-A.DUCK.AUTO 1' },
            { type: 'textinput', label: 'Value', id: 'value', default: '' }
          ],
          callback: (action) => {
            try {
              const actions = require('./actions');
              actions.sendCommand.call(this, action.options);
            } catch (err) {
              console.log(`sendCommand error: ${err.message}`);
            }
          }
        }
      });
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
              bgcolor: state === 'ON' ? 0x00FF00 : 0xFF0000 // Forest green, deep red
            };
          }
        }
      });
    }
  }

  runEntrypoint(BlazeAmpController, []);
} catch (err) {
  console.error(`Module load error: ${err.message}`);
  throw err;
}