module.exports = {
  powerOn(moduleInstance) {
    moduleInstance.handleCommand('POWER_ON');
  },
  powerOff(moduleInstance) {
    moduleInstance.handleCommand('POWER_OFF');
  }
};