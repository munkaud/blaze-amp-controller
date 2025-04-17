module.exports = {
    debugCommand: {
      label: 'Send Raw Command',
      options: [
        { type: 'textinput', label: 'Command', id: 'command', default: 'SET ZONE-A.DUCK.AUTO 1' },
        { type: 'textinput', label: 'Value', id: 'value', default: '' }
      ],
      actions: [{ action: 'sendCommand', options: { command: '$(this:command)', value: '$(this:value)' } }]
    }
  };