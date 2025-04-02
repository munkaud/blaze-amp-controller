module.exports = (instance) => [
    {
      type: 'button',
      category: 'Power Control',
      name: 'Power On',
      style: { text: 'Power On', size: '18', color: '16777215', bgcolor: '0' },
      steps: [{ down: [{ actionId: 'powerOn', options: {} }], up: [] }],
      feedbacks: [{ feedbackId: 'powerOnState' }],
    },
    {
      type: 'button',
      category: 'Power Control',
      name: 'Power Off',
      style: { text: 'Power Off', size: '18', color: '16777215', bgcolor: '0' },
      steps: [{ down: [{ actionId: 'powerOff', options: {} }], up: [] }],
      feedbacks: [{ feedbackId: 'powerOffState' }],
    },
  ];