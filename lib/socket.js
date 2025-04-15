const { TCPHelper } = require('@companion-module/base');

module.exports = {
  initSocket(instance) {
    if (instance.socket) {
      instance.socket.destroy();
    }
    instance.socket = new TCPHelper(instance.config.host, instance.config.port);

    instance.socket.on('connect', () => {
      instance.updateStatus('ok');
      instance.emit('socket_connected');
    });

    instance.socket.on('error', (err) => {
      instance.updateStatus('connection_failure');
      instance.log('error', `Socket error: ${err.message}`);
    });

    instance.socket.on('data', (data) => {
      const messages = data.toString().trim().split('\n');
      messages.forEach(message => require('./parser')(instance, message));
      // Removed instance.checkFeedbacks() to avoid double-trigger
    });
  },

  destroySocket(instance) {
    if (instance.socket) {
      instance.socket.destroy();
      instance.socket = null;
    }
  },
};