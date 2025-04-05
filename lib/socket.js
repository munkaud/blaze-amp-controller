const { TCPHelper } = require('@companion-module/base');

module.exports = {
  initSocket(instance) {
    if (instance.socket) {
      instance.socket.destroy();
    }
    instance.socket = new TCPHelper(instance.config.host, instance.config.port);

    instance.socket.on('connect', () => {
      instance.updateStatus('ok');
      instance.log('info', 'Connected to Blaze Audio amplifier');
      require('./poller').pollConfig(instance);
    });

    instance.socket.on('error', (err) => {
      instance.updateStatus('connection_failure');
      instance.log('error', `Socket error: ${err.message}`);
    });

    instance.socket.on('data', (data) => {
      instance.log('debug', `Raw data received: ${data.toString().trim()}`);
      const messages = data.toString().trim().split('\n');
      messages.forEach(message => require('./parser')(instance, message));
      instance.log('debug', 'Data received, updating presets');
      instance.updatePresets();
      instance.checkFeedbacks();
      instance.updatePresets(); // Double-call to force UI
    });
  },

  destroySocket(instance) {
    if (instance.socket) {
      instance.socket.destroy();
      instance.socket = null;
    }
  },
};