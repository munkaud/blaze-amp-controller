const configParser = require('../lib/config');
module.exports = {
  getConfig() {
    this.sendCommand(configParser.getConfigCommand());
  }
};