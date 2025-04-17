module.exports = {
  setup: function (instance) {
    instance.setActionDefinitions({
      getConfig: {
        name: 'Get Config',
        options: [],
        callback: async () => {
          instance.sendCommand('GET CONFIG\r\n');
        }
      },
      powerOn: {
        name: 'Power On',
        options: [],
        callback: async () => {
          instance.handleCommand('POWER_ON', null);
        }
      },
      powerOff: {
        name: 'Power Off',
        options: [],
        callback: async () => {
          instance.handleCommand('POWER_OFF', null);
        }
      },
      sendCommand: {
        name: 'Send Raw Command',
        options: [
          {
            type: 'textinput',
            label: 'Command',
            id: 'command',
            default: 'SET ZONE-A.DUCK.AUTO 1'
          },
          {
            type: 'textinput',
            label: 'Value',
            id: 'value',
            default: ''
          }
        ],
        callback: async (action) => {
          instance.handleCommand(action.options.command, action.options.value);
        }
      },
      toggleZoneMute: {
        name: 'Toggle Zone Mute',
        options: [
          {
            type: 'textinput',
            label: 'Zone (A, B, C, D)',
            id: 'zone',
            default: 'A'
          }
        ],
        callback: async (action) => {
          instance.handleCommand(`SET ZONE-${action.options.zone}.MUTE`, 'TOGGLE');
        }
      },
      setZoneSource: {
        name: 'Set Zone Source',
        options: [
          {
            type: 'textinput',
            label: 'Zone (A, B, C, D)',
            id: 'zone',
            default: 'A'
          },
          {
            type: 'textinput',
            label: 'Source (100, 102, 200, 400)',
            id: 'source',
            default: '100'
          }
        ],
        callback: async (action) => {
          instance.handleCommand(`SET ZONE-${action.options.zone}.SOURCE`, action.options.source);
        }
      }
    });
  }
};