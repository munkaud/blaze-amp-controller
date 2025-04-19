const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  // DSP generator input
  const generatorInput = self.state.inputs.find(iid => iid === 'IN-400') || { iid: '400', label: 'Generator Input 400' };

  const iid = generatorInput.iid || '400';
  const label = generatorInput.label || 'Generator Input';
  self.log('debug', `Generating DSP generator preset for IN-${iid}`);
  presets.push({
    type: 'button',
    category: 'Generator Input',
    name: `Generator Input Gain`,
    style: {
      text: `${label} Gain`,
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: `GET IN-${iid}.GAIN`, value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  });
  presets.push({
    type: 'button',
    category: 'Generator Input',
    name: `Generator Input Mute`,
    style: {
      text: `${label} Mute`,
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: `SET IN-${iid}.MUTE 1`, value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [
      {
        feedbackId: 'input_mute',
        options: { inputId: iid },
        style: {
          bgcolor: combineRgb(255, 0, 0),
          color: combineRgb(255, 255, 255),
        },
      },
    ],
  });
  presets.push({
    type: 'button',
    category: 'Generator Input',
    name: `Generator Input Type`,
    style: {
      text: `${label} Type`,
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: 'sendCommand',
            options: { command: `GET IN-${iid}.TYPE`, value: '' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  });

  return presets;
};