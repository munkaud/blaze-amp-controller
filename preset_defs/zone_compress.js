const { combineRgb } = require('@companion-module/base');
const actions = require('../actions');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) {
      self.log('debug', `Skipping Zone ${zone} Compression (secondary)`);
      return;
    }

    const zoneLetter = zone.split('-')[1];
    self.log('debug', `Generating Zone ${zoneLetter} Compression presets`);
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Compression`,
      name: `Enable Zone ${zoneLetter} Compression`,
      style: {
        text: `Enable ${zoneLetter} Comp`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.COMP.ENABLE 1`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Compression`,
      name: `Disable Zone ${zoneLetter} Compression`,
      style: {
        text: `Disable ${zoneLetter} Comp`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.COMP.ENABLE 0`, value: '' },
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