module.exports = {
  initialize: {
    category: 'Setup',
    label: 'Initialize',
    bank: { style: 'text', text: 'Init', size: '14', color: '16777215', bgcolor: '0' },
    actions: [{ action: 'getConfig', options: {} }]
  },
  sendRawCommand: {
    category: 'Debug',
    label: 'Send Raw Command',
    bank: { style: 'text', text: 'Send Cmd', size: '14', color: '16777215', bgcolor: '0' },
    actions: [{ action: 'sendCommand', options: { command: 'SET ZONE-A.DUCK.AUTO 1', value: '' } }]
  },
  powerOn: {
    category: 'Power',
    label: 'Power On',
    bank: { style: 'text', text: 'Power On', size: '14', color: '16777215', bgcolor: '0' },
    actions: [{ action: 'powerOn', options: {} }],
    feedbacks: [{ feedbackId: 'powerState', options: {} }]
  },
  powerOff: {
    category: 'Power',
    label: 'Power Off',
    bank: { style: 'text', text: 'Power Off', size: '14', color: '16777215', bgcolor: '0' },
    actions: [{ action: 'powerOff', options: {} }],
    feedbacks: [{ feedbackId: 'powerState', options: {} }]
  }
};