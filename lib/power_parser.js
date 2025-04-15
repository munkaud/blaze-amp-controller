module.exports = function (instance, message) {
    let stateChanged = false;
  
    if (message.startsWith('+SYSTEM.STATUS.STATE')) {
      const state = message.split('"')[1];
      const newPowerState = state === 'ON' ? 'ON' : 'OFF';
      if (instance.state.power !== newPowerState) stateChanged = true;
      instance.state.power = newPowerState;
      instance.log('info', `Power state set to ${instance.state.power} (raw: ${state})`);
    } else if (message === '*POWER_ON') {
      if (instance.state.power !== 'ON') stateChanged = true;
      instance.state.power = 'ON';
      instance.log('info', 'Power state set to ON');
    } else if (message === '*POWER_OFF') {
      if (instance.state.power !== 'OFF') stateChanged = true;
      instance.state.power = 'OFF';
      instance.log('info', 'Power state set to OFF');
    } else if (message.includes('#GET SYSTEM.STATUS.STATE|Command Failed')) {
      instance.log('warn', 'GET SYSTEM.STATUS.STATE failed - relying on last known state');
    }
  
    return stateChanged;
  };