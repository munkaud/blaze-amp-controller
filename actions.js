module.exports = (self) => ({
  sendCommand: {
    name: 'Send Command',
    options: [
      {
        type: 'textinput',
        label: 'Command',
        id: 'command',
        default: '',
      },
      {
        type: 'textinput',
        label: 'Value',
        id: 'value',
        default: '',
      },
    ],
    callback: async (event) => {
      const { command, value } = event.options;
      if (command && self.socket) {
        const cmd = value ? `${command} ${value}\n` : `${command}\n`;
        self.log('debug', `Sending: ${cmd.trim()}`);
        self.socket.send(cmd);
      } else {
        self.log('error', 'Invalid command or no socket');
      }
    },
  },
});