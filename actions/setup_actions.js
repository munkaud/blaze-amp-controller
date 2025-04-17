module.exports = {
    setup(moduleInstance) {
      const powerActions = require('./power_actions');
      const configActions = require('./config_actions');
      const actions = require('./actions');
  
      moduleInstance.setActionDefinitions({
        getConfig: {
          name: 'Get Config',
          options: [],
          callback: () => {
            try {
              configActions.getConfig(moduleInstance);
            } catch (err) {
              console.log(`getConfig error: ${err.message}`);
            }
          }
        },
        powerOn: {
          name: 'Power On',
          options: [],
          callback: () => {
            try {
              powerActions.powerOn(moduleInstance);
            } catch (err) {
              console.log(`powerOn error: ${err.message}`);
            }
          }
        },
        powerOff: {
          name: 'Power Off',
          options: [],
          callback: () => {
            try {
              powerActions.powerOff(moduleInstance);
            } catch (err) {
              console.log(`powerOff error: ${err.message}`);
            }
          }
        },
        sendCommand: {
          name: 'Send Raw Command',
          options: [
            { type: 'textinput', label: 'Command', id: 'command', default: 'SET ZONE-A.DUCK.AUTO 1' },
            { type: 'textinput', label: 'Value', id: 'value', default: '' }
          ],
          callback: (action) => {
            try {
              actions.sendCommand(moduleInstance, action.options);
            } catch (err) {
              console.log(`sendCommand error: ${err.message}`);
            }
          }
        }
      });
    }
  };