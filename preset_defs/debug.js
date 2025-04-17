const { combineRgb } = require('@companion-module/base');

module.exports = [
  {
    category: 'Setup',
    label: 'Initialize',
    bank: {
      style: 'text',
      text: 'Init',
      size: 'auto',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0)
    },
    actions: [{ action: 'getConfig', options: {} }]
  }
];