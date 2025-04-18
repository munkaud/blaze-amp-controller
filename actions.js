module.exports = (self) => ({
  sendCommand: {
    name: 'Send Command',
    options: [
      {
        type: 'textinput',
        label: 'Command',
        id: 'command',
        default: 'GET CONFIG',
      },
      {
        type: 'textinput',
        label: 'Value',
        id: 'value',
        default: '',
      },
    ],
    callback: async (action) => {
      const cmd = `${action.options.command} ${action.options.value}`.trim();
      self.log('debug', `Sending: ${cmd}`);
      if (self.socket) {
        self.socket.send(cmd + '\n');
      }
    },
  },
});
