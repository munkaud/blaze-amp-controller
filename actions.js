module.exports = {
  sendCommand(options) {
    const { command, value } = options;
    this.handleCommand(command, value);
  }
};