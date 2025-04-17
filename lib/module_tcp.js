const net = require('net');

module.exports = {
  createConnection(moduleInstance) {
    const { config } = moduleInstance;
    if (moduleInstance.socket) {
      moduleInstance.socket.destroy();
    }
    moduleInstance.socket = new net.Socket();
    moduleInstance.socket.setEncoding('utf8');
    moduleInstance.responseBuffer = '';

    moduleInstance.socket.on('connect', () => {
      console.log('Connected to amp');
      moduleInstance.setVariableValues({ connection_state: 'connected' });
    });

    moduleInstance.socket.on('data', (data) => {
      moduleInstance.responseBuffer += data;
      const responses = moduleInstance.responseBuffer.split('\r\n');
      moduleInstance.responseBuffer = responses.pop();
      responses.forEach((response) => {
        if (response) moduleInstance.onResponse(response);
      });
    });

    moduleInstance.socket.on('error', (err) => {
      console.log(`Socket error: ${err.message}`);
      moduleInstance.setVariableValues({ connection_state: 'error' });
      moduleInstance.socket.destroy();
      moduleInstance.socket = null;
      setTimeout(() => moduleInstance.connectToAmp(), 5000);
    });

    moduleInstance.socket.on('close', () => {
      console.log('Connection closed');
      moduleInstance.setVariableValues({ connection_state: 'disconnected' });
      moduleInstance.socket = null;
      setTimeout(() => moduleInstance.connectToAmp(), 5000);
    });

    moduleInstance.socket.connect(config.port, config.host);
  },

  sendCommand(moduleInstance, cmd) {
    if (!moduleInstance.socket || moduleInstance.socket.destroyed) {
      console.log(`Cannot send: ${cmd.trim()} (no connection)`);
      moduleInstance.connectToAmp();
      return;
    }
    console.log(`Sending: ${cmd}`);
    moduleInstance.socket.write(cmd);
  },

  destroy(moduleInstance) {
    if (moduleInstance.socket) {
      moduleInstance.socket.destroy();
      moduleInstance.socket = null;
    }
    console.log('TCP connection destroyed');
  }
};