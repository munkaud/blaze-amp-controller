const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) return;

    zones.forEach((targetZone) => {
      if (zone !== targetZone && !self.state.zoneLinks[targetZone]) {
        presets.push({
          type: 'button',
          category: `${zone} Linking`,
          name: `${zone} Link to ${targetZone}`,
          style: {
            text: `${zone} Link ${targetZone}`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'sendCommand',
                  options: { command: `SET ${zone}.LINK ${targetZone}`, value: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        });
      }
    });
    presets.push(
      {
        type: 'button',
        category: `${zone} Linking`,
        name: `${zone} Unlink`,
        style: {
          text: `${zone} Unlink`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'sendCommand',
                options: { command: `UNSET ${zone}.LINK`, value: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        type: 'button',
        category: `${zone} Linking`,
        name: `${zone} Get Link`,
        style: {
          text: `${zone} Get Link`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'sendCommand',
                options: { command: `GET ${zone}.LINK`, value: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      }
    );
  });

  return presets;
};