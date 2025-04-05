module.exports = function (instance, message) {
    instance.log('debug', `Parsing response: ${message}`);
    if (message.startsWith('#GET POWER')) {
      instance.state.power = 'OFF';
      instance.log('info', 'Power state assumed OFF');
    } else if (message.startsWith('+POWER')) {
      instance.state.power = message.includes('ON') ? 'ON' : 'OFF';
      instance.log('info', `Power state set to ${this.state.power}`);
    } else if (message === '*POWER_ON') {
      instance.state.power = 'ON';
      instance.log('info', 'Power state set to ON');
    } else if (message === '*POWER_OFF') {
      instance.state.power = 'OFF';
      instance.log('info', 'Power state set to OFF');
    } else if (message.includes('#GET POWER|Command Failed')) {
      instance.state.power = 'OFF';
      instance.log('info', 'Power state assumed OFF due to command failure');
    } else if (message.startsWith('+IN.COUNT')) {
      instance.state.inputs = parseInt(message.split(' ')[1], 10);
      instance.log('info', `Input count set to ${instance.state.inputs}`);
      const primaryIids = [100, 102, 200, 400];
      primaryIids.forEach(iid => {
        instance.socket.send(`GET IN-${iid}.NAME\n`);
        instance.socket.send(`GET IN-${iid}.GAIN\n`);
        if (iid !== 400) instance.socket.send(`GET IN-${iid}.STEREO\n`);
        if (iid === 100 || iid === 102) instance.socket.send(`GET IN-${iid}.SENS\n`);
      });
      // Rest of your input, zone, output parsing...
    }
    // Add the rest of your parseResponse logic here
    instance.checkFeedbacks();
  };