const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [
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
          feedbackId: 'powerState',
          options: { state: 'ON' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(0, 255, 0),
          },
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
          feedbackId: 'powerState',
          options: { state: 'OFF' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      type: 'button',
      category: 'Zone A',
      name: 'Zone A Mute',
      style: {
        text: 'Zone A Mute',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: 'SET ZONE-A.MUTE 1', value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      type: 'button',
      category: 'Zone A',
      name: 'Zone A Compressor Auto',
      style: {
        text: 'Zone A Comp Auto',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: 'SET ZONE-A.COMPRESSOR.AUTO 1', value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
  ];

  return presets;
};