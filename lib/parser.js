module.exports = function (instance, message) {
  instance.log('debug', `Parsing response: ${message}`);
  let stateChanged = false; // Track if power state changes

  // Power state parsing
  if (message.startsWith('+SYSTEM.STATUS.STATE')) {
    const state = message.split('"')[1]; // Extract "ON", "STANDBY", etc.
    const newPowerState = state === 'ON' ? 'ON' : 'OFF';
    if (instance.state.power !== newPowerState) stateChanged = true; // Flag change
    instance.state.power = newPowerState;
    instance.log('info', `Power state set to ${instance.state.power} (raw: ${state})`);
  } else if (message === '*POWER_ON') {
    if (instance.state.power !== 'ON') stateChanged = true; // Flag change
    instance.state.power = 'ON';
    instance.log('info', 'Power state set to ON');
  } else if (message === '*POWER_OFF') {
    if (instance.state.power !== 'OFF') stateChanged = true; // Flag change
    instance.state.power = 'OFF';
    instance.log('info', 'Power state set to OFF');
  } else if (message.includes('#GET SYSTEM.STATUS.STATE|Command Failed')) {
    instance.log('warn', 'GET SYSTEM.STATUS.STATE failed - relying on last known state');
  }

  // Count parsing
  else if (message.startsWith('+IN.COUNT')) {
    instance.state.inputs = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Input count set to ${instance.state.inputs}`);
    const primaryIids = [100, 102, 200, 400];
    primaryIids.forEach(iid => {
      instance.socket.send(`GET IN-${iid}.NAME\n`);
      instance.socket.send(`GET IN-${iid}.GAIN\n`);
      if (iid !== 400) instance.socket.send(`GET IN-${iid}.STEREO\n`);
      if (iid === 100 || iid === 102) instance.socket.send(`GET IN-${iid}.SENS\n`);
    });
  } else if (message.startsWith('+ZONE.COUNT')) {
    instance.state.zones = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Zone count set to ${instance.state.zones}`);
  } else if (message.startsWith('+OUT.COUNT')) {
    instance.state.outputs = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Output count set to ${instance.state.outputs}`);
  }

  // Input detail parsing
  else if (message.match(/\+IN-\d+\.NAME/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.NAME "(.*)"/);
    instance.state.inputNames[iid] = value;
    instance.log('info', `Input ${iid} name set to "${value}"`);
  } else if (message.match(/\+IN-\d+\.GAIN/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.GAIN (-?\d+\.\d+)/);
    instance.state.inputGains[iid] = parseFloat(value);
    instance.log('info', `Input ${iid} gain set to ${value} dB`);
  } else if (message.match(/\+IN-\d+\.STEREO/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.STEREO (\d+)/);
    instance.state.stereoPairs[iid] = parseInt(value, 10) === 1;
    instance.log('info', `Input ${iid} stereo set to ${instance.state.stereoPairs[iid]}`);
  } else if (message.match(/\+IN-\d+\.SENS/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.SENS "(.*)"/);
    instance.state.inputSensitivities[iid] = value;
    instance.log('info', `Input ${iid} sensitivity set to ${value}`);
  }

  // Catch unhandled responses (skip *GET echoes)
  else if (!message.startsWith('*GET')) {
    instance.log('warn', `Unhandled response: ${message}`);
  }

  instance.checkFeedbacks();
  if (stateChanged) {
    instance.emit('update_state'); // Trigger preset refresh
    instance.log('debug', 'Emitted update_state event');
  }
};