const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];

  zones.forEach((zone, index) => {
    if (self.state.zoneLinks[zone] || index % 2 !== 0) return; // Skip secondary zones and non-primary indices

    const zoneLetter = zone.split('-')[1];
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