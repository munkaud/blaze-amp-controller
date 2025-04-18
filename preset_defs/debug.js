const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  console.log('Debug presets accessed with instance config:', self.config);
  return {
    init: {
      category: 'Setup',
      label: 'Initialize',
      bank: {
        style: 'text',
        text: 'Init',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      actions: [{ action: 'getConfig', options: {} }]
    },
    send_cmd: {
      category: 'Debug',
      label: 'Send Raw Command',
      bank: {
        style: 'text',
        text: 'Send Cmd',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      actions: [{ action: 'sendCommand', options: { command: 'SET ZONE-A.DUCK.AUTO 1', value: '' } }]
    }
  };
};