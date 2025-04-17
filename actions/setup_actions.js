module.exports = {
    setup(moduleInstance) {
      moduleInstance.setActionDefinitions({
        getConfig: {
          label: 'Get Config',
          options: [],
          callback: () => {
            try {
              const configActions = require('./config_actions');
              configActions.getConfig.call(moduleInstance);
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
              const powerActions = require('./power_actions');
              powerActions.powerOn.call(moduleInstance);
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
              const powerActions = require('./power_actions');
              powerActions.powerOff.call(moduleInstance);
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
              actions.sendCommand.call(moduleInstance, action.options);
            } catch (err) {
              console.log(`sendCommand error: ${err.message}`);
            }
          }
        }
      });
    }
  };