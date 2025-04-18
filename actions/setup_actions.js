module.exports = {
  getActions(instance) {
    const actions = {
      getConfig: {
        name: 'Get Config',
        options: [],
        callback: async () => {
          instance.log('info', 'Sending: GET CONFIG');
          instance.sendCommand('GET CONFIG\r\n');
        }
      },
      sendCommand: {
        name: 'Send Command',
        options: [
          {
            type: 'textinput',
            label: 'Command',
            id: 'command',
            default: ''
          },
          {
            type: 'textinput',
            label: 'Value',
            id: 'value',
            default: ''
          }
        ],
        callback: async (action) => {
          const cmd = action.options.command;
          const value = action.options.value;
          instance.log('info', `Handling command: ${cmd}, value: ${value}`);
          instance.handleCommand(cmd, value);
        }
      }
    };
    instance.log('info', `Action definitions registered: ${Object.keys(actions).length} actions`);
    return actions;
  },

  setup(instance) {
    instance.log('info', 'Setting up actions');
    const actions = this.getActions(instance);
    instance.setActionDefinitions(actions);
  }
};