module.exports = {
  getDefaultConfig() {
    return {
      host: '192.168.12.180',
      port: '7621'
    };
  },

  getConfigCommand() {
    return 'GET SYSTEM.CONFIG\r\n';
  },

  getConfigFields() {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'Amp Host',
        default: '192.168.12.180',
        regex: this.REGEX_IP
      },
      {
        type: 'textinput',
        id: 'port',
        label: 'Amp Port',
        default: '7621',
        regex: this.REGEX_PORT
      }
    ];
  }
};