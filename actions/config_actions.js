module.exports = {
  getConfig(moduleInstance) {
    const configParser = require('../lib/module_config');
    const cmd = configParser.getConfigCommand();
    moduleInstance.sendCommand(cmd);
  }
};