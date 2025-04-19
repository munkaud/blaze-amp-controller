const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  // All zones, but skip secondary ones
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D'];

  zones.forEach((zone) => {
    // Skip secondary zones (e.g., B if linked to A)
    if (self.state.zoneLinks[zone]) {
      self.log('debug', `Skipping Zone ${zone} Linking (secondary)`);
      return;
    }

    const zoneLetter = zone.split('-')[1];
    self.log('debug', `Generating Zone ${zoneLetter} Linking presets`);
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Linking`,
      name: `Enable Zone ${zoneLetter} Stereo`,
      style: {
        text: `Enable ${zoneLetter} Stereo`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.STEREO 1`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Linking`,
      name: `Disable Zone ${zoneLetter} Stereo`,
      style: {
        text: `Disable ${zoneLetter} Stereo`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.STEREO 0`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Linking`,
      name: `Get Zone ${zoneLetter} Stereo`,
      style: {
        text: `Get ${zoneLetter} Stereo`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.STEREO`, value: '' },
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