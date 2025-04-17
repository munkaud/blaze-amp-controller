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
        regex: '/^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/'
      },
      {
        type: 'textinput',
        id: 'port',
        label: 'Amp Port',
        default: '7621',
        regex: '/^\\d{1,5}$/'
      }
    ];
  }
};