const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Subscribe to Registers',
      style: { text: 'Sub Registers', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'SUBSCRIBE REG 1000', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Subscribe to Dynamic Data',
      style: { text: 'Sub Dynamic', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'SUBSCRIBE DYN 500', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Unsubscribe from Registers',
      style: { text: 'Unsub Registers', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'UNSUBSCRIBE REG', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Unsubscribe from Dynamic Data',
      style: { text: 'Unsub Dynamic', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'UNSUBSCRIBE DYN', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Unsubscribe All',
      style: { text: 'Unsub All', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'UNSUBSCRIBE *', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Increment Zone A Gain',
      style: { text: 'Inc Zone A Gain', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'INC ZONE-A.GAIN 1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Increment Zone B Gain',
      style: { text: 'Inc Zone B Gain', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'INC ZONE-B.GAIN 1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Increment Zone C Gain',
      style: { text: 'Inc Zone C Gain', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'INC ZONE-C.GAIN 1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Decrement Zone A Gain',
      style: { text: 'Dec Zone A Gain', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'INC ZONE-A.GAIN -1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Decrement Zone B Gain',
      style: { text: 'Dec Zone B Gain', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'INC ZONE-B.GAIN -1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Subscriptions',
      name: 'Decrement Zone C Gain',
      style: { text: 'Dec Zone C Gain', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: 'INC ZONE-C.GAIN -1', value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    }
  ];

  return presets;
};