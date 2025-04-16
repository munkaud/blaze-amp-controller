module.exports = (instance) => [
  {
    category: 'Power',
    label: 'Power On',
    bank: {
      style: 'text',
      text: 'Power On',
      size: '14',
      color: 16777215,
    },
    actions: [
      {
        action: 'powerOn',
        options: {},
      },
    ],
    feedbacks: [
      {
        feedbackId: 'powerOnState',
        options: {},
      },
    ],
  },
  {
    category: 'Power',
    label: 'Power Off',
    bank: {
      style: 'text',
      text: 'Power Off',
      size: '14',
      color: 16777215,
    },
    actions: [
      {
        action: 'powerOff',
        options: {},
      },
    ],
    feedbacks: [
      {
        feedbackId: 'powerOffState',
        options: {},
      },
    ],
  },
];