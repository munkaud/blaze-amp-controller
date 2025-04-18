const { combineRgb } = require('@companion-module/base');

module.exports = (self) => [
  {
    type: 'button',
    category: 'Power',
    name: 'Power On',
    style: {
      text: 'Power ON',
      size: '18',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: 'POWER_ON', value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [
      {
        feedbackId: 'power_state',
        options: {},
      },
    ],
  },
  {
    type: 'button',
    category: 'Power',
    name: 'Power Off',
    style: {
      text: 'Power OFF',
      size: '18',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: 'POWER_OFF', value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [
      {
        feedbackId: 'power_state',
        options: {},
      },
    ],
  },
  {
    type: 'button',
    category: 'Power',
    name: 'Standby On',
    style: {
      text: 'Standby ON',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: 'STANDBY_ON', value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Power',
    name: 'Standby Off',
    style: {
      text: 'Standby OFF',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: 'STANDBY_OFF', value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  },
];