const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const spdif1Name = 'S/PDIF 1';
  const spdif2Name = 'S/PDIF 2';
  const generatorName = 'Generator';

  // S/PDIF 1 Trim
  presets.push({
    type: 'button',
    category: 'Digital Inputs',
    name: 'Trim S/PDIF 1',
    style: { text: `${spdif1Name} Trim`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
    steps: [
      {
        down: [{ actionId: 'sendCommand', options: { command: 'SET IN-200.GAIN 0', value: '' } }],
        up: []
      }
    ],
    feedbacks: []
  });

  // S/PDIF 2 Trim
  presets.push({
    type: 'button',
    category: 'Digital Inputs',
    name: 'Trim S/PDIF 2',
    style: { text: `${spdif2Name} Trim`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
    steps: [
      {
        down: [{ actionId: 'sendCommand', options: { command: 'SET IN-201.GAIN 0', value: '' } }],
        up: []
      }
    ],
    feedbacks: []
  });

  // Generator Gain
  presets.push({
    type: 'button',
    category: 'Digital Inputs',
    name: 'Generator Gain',
    style: { text: `${generatorName} Gain`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
    steps: [
      {
        down: [{ actionId: 'sendCommand', options: { command: 'SET IN-400.GAIN 0', value: '' } }],
        up: []
      }
    ],
    feedbacks: []
  });

  return presets;
};