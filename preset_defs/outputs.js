const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const outputs = ['OUT-1', 'OUT-2', 'OUT-3', 'OUT-4']; // Match 1004’s 4 outputs

  // Power Presets
  presets.push({
    type: 'button',
    category: 'Power',
    name: 'Power On',
    style: {
      text: 'Power On',
      size: '14',
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
  });
  presets.push({
    type: 'button',
    category: 'Power',
    name: 'Power Off',
    style: {
      text: 'Power Off',
      size: '14',
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
  });

  // Output Presets
  outputs.forEach((output) => {
    const oid = output.split('-')[1];
    presets.push({
      type: 'button',
      category: `Output ${oid}`,
      name: `Output ${oid} Gain`,
      style: {
        text: `Output ${oid} Gain`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${output}.GAIN`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
    presets.push({
      type: 'button',
      category: `Output ${oid}`,
      name: `Output ${oid} Mute`,
      style: {
        text: `Output ${oid} Mute`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${output}.MUTE 1`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'output_mute',
          options: { outputId: oid },
          style: {
            bgcolor: combineRgb(255, 0, 0),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    });
    presets.push({
      type: 'button',
      category: `Output ${oid}`,
      name: `Output ${oid} Unmute`,
      style: {
        text: `Output ${oid} Unmute`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${output}.MUTE 0`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
  });

  return presets;
};