const { combineRgb } = require('@companion-module/base');
const actions = require('../actions');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) {
      self.log('debug', `Skipping Zone ${zone} Ducking (secondary)`);
      return;
    }

    const zoneLetter = zone.split('-')[1];
    self.log('debug', `Generating Zone ${zoneLetter} Ducking presets`);
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Enable Zone ${zoneLetter} Ducking`,
      style: {
        text: `Enable ${zoneLetter} Duck`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.DUCK.ENABLE 1`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Disable Zone ${zoneLetter} Ducking`,
      style: {
        text: `Disable ${zoneLetter} Duck`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.DUCK.ENABLE 0`, value: '' },
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