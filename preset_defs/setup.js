module.exports = (instance) => [
    {
      type: 'button',
      category: 'Configuration',
      name: 'Get Amp Config',
      style: { text: 'Get Config', size: '14', color: '16777215', bgcolor: '0' },
      steps: [{ down: [{ actionId: 'getConfig', options: {} }], up: [] }],
      feedbacks: [],
    },
  ];