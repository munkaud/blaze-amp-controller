const { combineRgb } = require('@companion-module/base');

module.exports = {
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
  }
};