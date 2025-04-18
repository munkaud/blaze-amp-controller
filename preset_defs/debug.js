const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  console.log('Debug presets accessed with instance config:', self.config);
  return [
    {
      type: 'button',
      category: 'Setup',
      name: 'Initialize',
      style: {
        text: 'Init',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'getConfig', options: {} }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Debug',
      name: 'Send Raw Command',
      style: {
        text: 'Send Cmd',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'SET ZONE-A.DUCK.AUTO 1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    }
  ];
};