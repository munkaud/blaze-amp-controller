const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) return; // Skip secondary zones

    const zoneLetter = zone.split('-')[1];
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Dante`,
      name: `Zone ${zoneLetter} Dante Source`,
      style: {
        text: `Zone ${zoneLetter} Dante Source`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DANTE_SRC`, value: '' },
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