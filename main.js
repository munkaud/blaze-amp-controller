const { CompanionModule } = require('@companion-module/base');
    const inputParser = require('./lib/input_parser');
    const outputParser = require('./lib/output_parser');
    const zoneParser = require('./lib/zone_parser');
    const configParser = require('./lib/config');
    const messageParser = require('./lib/message_parser');

    class BlazeAmpController extends CompanionModule {
      init() {
        this.config = { ...configParser.getDefaultConfig(), ...this.config };
        this.setupActions();
        this.setupFeedback();
        this.connectToAmp();
      }

      connectToAmp() {
        // Use config for TCP connection
        console.log(`Connecting to amp at ${this.config.host}:${this.config.port}`);
        // Your TCP logic here
      }

      handleCommand(command, value) {
        if (command.startsWith('ZONE-')) {
          const method = command.startsWith('GET') ? 'GET' : 'SET';
          const result = zoneParser.handle(command, value, method);
          if (result.error) {
            console.log(`Error: ${result.error}`);
            return;
          }
          this.sendCommand(result.cmd + '\r\n');
        } else if (command.startsWith('IN-')) {
          const result = inputParser.handle(command, value);
          if (result.cmd) this.sendCommand(result.cmd + '\r\n');
        } else if (command.startsWith('OUT-')) {
          const result = outputParser.handle(command, value);
          if (result.cmd) this.sendCommand(result.cmd + '\r\n');
        } else if (command === 'POWER_ON' || command === 'POWER_OFF') {
          this.sendCommand(result.cmd + '\r\n');
        }
      }

      onResponse(response) {
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
        } else if (response.startsWith('+ZONE-A.DUCK')) {
          const [, param, value] = response.match(/\+ZONE-A\.DUCK\.(\w+) (\S+)/) || [];
          if (param && value) {
            this.setVariable(`ducker_${param.toLowerCase()}`, value);
            console.log(`Set ducker_${param.toLowerCase()} to ${value}`);
          }
        } else if (response.startsWith('+ZONE-A.')) {
          const [, param, value] = response.match(/\+ZONE-A\.(\w+) (\S+)/) || [];
          if (param && value) {
            this.setVariable(`zone_${param.toLowerCase()}`, value);
            console.log(`Set zone_${param.toLowerCase()} to ${value}`);
          }
        } else if (response.startsWith('+OK')) {
          console.log('Command succeeded');
        } else if (response.includes('E104')) {
          console.log('Invalid parameter');
        } else if (response.includes('E105')) {
          console.log('Invalid number of arguments');
        }
      }

      sendCommand(cmd) {
        // Your TCP send logic
        console.log(`Sending: ${cmd}`);
      }

      setupActions() {
        this.setActions({
          getConfig: {
            label: 'Get Config',
            options: [],
            callback: () => require('./actions/config_actions').getConfig.call(this)
          },
          sendCommand: {
            label: 'Send Raw Command',
            options: [
              { type: 'textinput', label: 'Command', id: 'command', default: 'SET ZONE-A.DUCK.AUTO 1' },
              { type: 'textinput', label: 'Value', id: 'value', default: '' }
            ],
            callback: (action) => {
              this.handleCommand(action.options.command, action.options.value);
            }
          }
        });
      }

      setupFeedback() {
        console.log('Setting up feedback');
      }
    }

    module.exports = BlazeAmpController;