const { combineRgb } = require('@companion-module/base');

module.exports = [
  {
    type: 'button',
    category: 'Setup',
    label: 'Initialize',
    bank: {
      style: 'text',
      text: 'Init',
      size: 14,
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0)
    },
    actions: [{ action: 'getConfig', options: {} }]
  },
  {
    type: 'button',
    category: 'Debug',
    label: 'Send Raw Command',
    bank: {
      style: 'text',
      text: 'Send Cmd',
      size: 14,
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0)
    },
    actions: [{ action: 'sendCommand', options: { command: 'SET ZONE-A.DUCK.AUTO 1', value: '' } }]
  }
];