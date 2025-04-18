const { combineRgb } = require('@companion-module/base');

module.exports = (self) => [
  {
    type: 'advanced',
    id: 'power_state',
    name: 'Power State Feedback',
    options: [],
    callback: (feedback) => {
      const powerState = self.state.power || 'OFF';
      if (powerState === 'ON') {
        return {
          text: 'Power ON ✓',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(34, 139, 34), // Forest green
        };
      } else {
        return {
          text: 'Power OFF ✓',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(139, 0, 0), // Deep red
        };
      }
    },
  },
  {
    type: 'advanced',
    id: 'system_info',
    name: 'System Info Display',
    options: [],
    callback: (feedback) => {
      const { apiVersion, state, signalIn, signalOut, lan, wifi } = self.state;
      return {
        text: `API: ${apiVersion || 'N/A'}\nState: ${state || 'N/A'}`,
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 50),
      };
    },
  }
];