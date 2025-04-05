module.exports = {
    pollConfig(instance) {
      instance.log('debug', 'Polling amp configuration');
      instance.socket.send('GET POWER\n');
      instance.socket.send('GET IN.COUNT\n');
      instance.socket.send('GET ZONE.COUNT\n');
      instance.socket.send('GET OUT.COUNT\n');
      // Add more GET commands as needed (e.g., input names, zone details)
    }
  };