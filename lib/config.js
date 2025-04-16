module.exports = {
    getConfigFields() {
      return [
        {
          type: 'textinput',
          id: 'host',
          label: 'Target IP',
          width: 8,
          default: '192.168.12.180', // Match the IP from the log
        },
        {
          type: 'number',
          id: 'port',
          label: 'Target Port',
          width: 4,
          default: 10001, // Match the port used in socket_manager.js
          min: 1,
          max: 65535,
        },
      ];
    },
  };