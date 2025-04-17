module.exports = {
  sendCommand(moduleInstance, options) {
    moduleInstance.handleCommand(options.command, options.value);
  }
};