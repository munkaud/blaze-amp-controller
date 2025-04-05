module.exports = {
    pollConfig(instance) {
      instance.log('debug', 'Polling amp configuration - START');
      instance.socket.send('GET SYSTEM.STATUS.STATE\n');
      instance.log('debug', 'Sent: GET SYSTEM.STATUS.STATE\\n');
      instance.socket.send('GET IN.COUNT\n');
      instance.log('debug', 'Sent: GET IN.COUNT\\n');
      instance.socket.send('GET ZONE.COUNT\n');
      instance.log('debug', 'Sent: GET ZONE.COUNT\\n');
      instance.socket.send('GET OUT.COUNT\n');
      instance.log('debug', 'Sent: GET OUT.COUNT\\n');
      instance.log('debug', 'Polling amp configuration - END');
    }
  };