const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];
  const danteChannels = ['DANTE1', 'DANTE2', 'DANTE3', 'DANTE4']; // Adjust based on model

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) return;

    const zoneLetter = zone.split('-')[1];
    danteChannels.forEach((channel) => {
      presets.push({
        type: 'button',
        category: `Zone ${zoneLetter} Dante`,
        name: `Set Zone ${zoneLetter} Dante ${channel}`,
        style: {
          text: `${zoneLetter} Dante ${channel}`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'sendCommand',
                options: { command: `SET ${zone}.DANTE_SRC ${channel}`, value: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      });
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Dante`,
      name: `Get Zone ${zoneLetter} Dante Source`,
      style: {
        text: `Get ${zoneLetter} Dante Src`,
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