const { combineRgb } = require('@companion-module/base');

module.exports = (self) => [
    {
        type: 'button',
        category: 'Debug',
        name: 'System Info',
        style: {
          text: 'System Info',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'sendCommand', options: { command: 'GET API_VERSION', value: '' } },
              { actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.STATE', value: '' } },
              { actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.SIGNAL_IN', value: '' } },
              { actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.SIGNAL_OUT', value: '' } },
              { actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.LAN', value: '' } },
              { actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.WIFI', value: '' } },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'system_info',
            options: {},
          },
        ],
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
