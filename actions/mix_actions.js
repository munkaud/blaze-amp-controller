// this file is a stub created on 15-April-2025
// None of this functions yet! And I will be adding stuff once I get to that section of the API!
module.exports = function (instance) {
    return {
      // Add mix-related actions here in the future
      // Example placeholder:
      setMixLevel: {
        name: 'Set Mix Level',
        options: [
          {
            type: 'number',
            label: 'Mix ID',
            id: 'mixId',
            default: 1,
            min: 1,
            max: 4,
          },
          {
            type: 'number',
            label: 'Level (dB)',
            id: 'level',
            default: 0,
            min: -60,
            max: 0,
          },
        ],
        callback: (action) => {
          const mixId = action.options.mixId;
          const level = action.options.level;
          instance.socketManager.queueCommand(`SET MIX-${mixId}.LEVEL ${level}\n`);
          instance.log('info', `Setting Mix ${mixId} level to ${level} dB`);
        },
      },
    };
  };