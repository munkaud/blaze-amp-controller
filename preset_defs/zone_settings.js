const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) {
      self.log('debug', `Skipping Zone ${zone} Settings (secondary)`);
      return;
    }

    const zoneLetter = zone.split('-')[1];
    self.log('debug', `Generating Zone ${zoneLetter} Settings presets`);
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Zone ${zoneLetter} Gain`,
      style: {
        text: `Zone ${zoneLetter} Gain`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.GAIN`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Zone ${zoneLetter} Mute`,
      style: {
        text: `Zone ${zoneLetter} Mute`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.MUTE 1`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'zone_mute',
          options: { zoneId: zone },
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