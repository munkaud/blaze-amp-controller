const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  // SPDIF inputs (IN-200, IN-201)
  const spdifInputs = self.state.inputs.filter(iid => ['IN-200', 'IN-201'].includes(iid)) || [
    { iid: '200', label: 'SPDIF Input 200' },
    { iid: '201', label: 'SPDIF Input 201' },
  ];

  spdifInputs.forEach((input) => {
    const iid = input.iid || input.split('-')[1];
    const label = input.label || `SPDIF Input ${iid}`;
    self.log('debug', `Generating SPDIF input preset for IN-${iid}`);
    presets.push({
      type: 'button',
      category: 'Digital Inputs',
      name: `SPDIF Input ${iid} Gain`,
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
      category: 'Digital Inputs',
      name: `SPDIF Input ${iid} Mute`,
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
  });

  return presets;
};