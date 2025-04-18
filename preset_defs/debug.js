const { combineRgb } = require('@companion-module/base');

module.exports = (self) => [
  {
    type: 'button',
    category: 'Debug',
    name: 'Initialize',
    style: {
      text: 'Initialize',
      size: '18',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: 'GET CONFIG', value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Debug',
    name: 'Send Raw Command',
    style: {
      text: 'Send Raw Cmd',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: 'GET HARDWARE', value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  },
];