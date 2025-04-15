module.exports = (instance) => [
  {
    type: 'button',
    category: 'Power',
    name: 'Power On',
    style: { text: 'Power On', size: '14', color: '16777215' },
    steps: [{ down: [{ actionId: 'powerOn', options: {} }], up: [] }],
    feedbacks: [
      {
        feedbackId: 'powerOnState',
        options: {},
      },
    ],
  },
  {
    type: 'button',
    category: 'Power',
    name: 'Power Off',
    style: { text: 'Power Off', size: '14', color: '16777215' },
    steps: [{ down: [{ actionId: 'powerOff', options: {} }], up: [] }],
    feedbacks: [
      {
        feedbackId: 'powerOffState',
        options: {},
      },
    ],
  },
];