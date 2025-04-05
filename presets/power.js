module.exports = (instance) => [
  {
    type: 'button',
    category: 'Power Control',
    name: 'Power On',
    style: { text: 'Power On', size: '18', color: '16777215' }, // White text, no bgcolor
    steps: [{ down: [{ actionId: 'setPower', options: { state: 'ON' } }], up: [] }],
    feedbacks: [{ feedbackId: 'powerOnState' }],
  },
  {
    type: 'button',
    category: 'Power Control',
    name: 'Power Off',
    style: { text: 'Power Off', size: '18', color: '16777215' }, // White text, no bgcolor
    steps: [{ down: [{ actionId: 'setPower', options: { state: 'OFF' } }], up: [] }],
    feedbacks: [{ feedbackId: 'powerOffState' }],
  },
  {
    type: 'button',
    category: 'Power Control',
    name: 'Get Power State',
    style: { text: 'Get Power', size: '14', color: '16777215' },
    steps: [{ down: [{ actionId: 'getPower', options: {} }], up: [] }],
    feedbacks: [],
  },
];