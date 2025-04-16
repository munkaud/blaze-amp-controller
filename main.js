const { CompanionModule } = require('@companion-module/base');
const inputParser = require('./lib/input_parser');
const outputParser = require('./lib/output_parser');
const zoneParser = require('./lib/zone_parser');
const configActions = require('./actions/config_actions');

class BlazeAmpController extends CompanionModule {
  init() {
    this.setupActions();
    this.setupFeedback();
    this.connectToAmp();
  }

  connectToAmp() {
    // Your existing TCP logic (nc 192.168.12.180 7621)
    // Placeholder: replace with your actual connection code
    console.log('Connecting to amp at 192.168.12.180:7621');
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
      // Handle input commands (from input_parser.js)
      const result = inputParser.handle(command, value);
      if (result.cmd) this.sendCommand(result.cmd + '\r\n');
    } else if (command.startsWith('OUT-')) {
      // Handle output commands (from output_parser.js)
      const result = outputParser.handle(command, value);
      if (result.cmd) this.sendCommand(result.cmd + '\r\n');
    } else if (command === 'POWER_ON' || command === 'POWER_OFF') {
      this.sendCommand(`${command}\r\n`);
    }
  }

  onResponse(response) {
    if (response.startsWith('+ZONE-A.COMPRESSOR')) {
      const [, param, value] = response.match(/\+ZONE-A\.COMPRESSOR\.(\w+) (\S+)/) || [];
      if (param && value) {
        this.setVariable(`compressor_${param.toLowerCase()}`, value);
        console.log(`Set compressor_${param.toLowerCase()} to ${value}`);
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
    // Your existing TCP send logic
    // Placeholder: replace with your actual send code
    console.log(`Sending: ${cmd}`);
  }

  setupActions() {
    this.setActions({
      getConfig: {
        label: 'Get Config',
        options: [],
        callback: () => configActions.getConfig.call(this)
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
      // Add more actions from actions.js, power_actions.js
    });
  }

  setupFeedback() {
    // Your existing feedback (e.g., power button colors)
    // Placeholder
    console.log('Setting up feedback');
  }
}

module.exports = BlazeAmpController;