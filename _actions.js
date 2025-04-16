function initActions(instance) {
    const actions = {
      power: {
        name: 'Set Power State',
        options: [
          {
            type: 'dropdown',
            label: 'Power State',
            id: 'state',
            default: 'ON',
            choices: [
              { id: 'ON', label: 'On' },
              { id: 'OFF', label: 'Off' },
            ],
          },
        ],
        callback: (action) => {
          const cmd = action.options.state === 'ON' ? '*POWER_ON\n' : '*POWER_OFF\n';
          instance.socketManager.queueCommand(cmd);
        },
      },
      setZoneGain: {
        name: 'Set Zone Gain',
        options: [
          {
            type: 'dropdown',
            label: 'Zone',
            id: 'zone',
            default: 'A',
            choices: [
              { id: 'A', label: 'Zone A' },
              { id: 'B', label: 'Zone B' },
              { id: 'C', label: 'Zone C' },
              { id: 'D', label: 'Zone D' },
            ],
          },
          {
            type: 'number',
            label: 'Gain (dB)',
            id: 'gain',
            default: 0,
            min: -100,
            max: 12,
            step: 0.1,
          },
        ],
        callback: (action) => {
          const zone = action.options.zone;
          const gain = parseFloat(action.options.gain).toFixed(1);
          instance.socketManager.queueCommand(`SET ZONE-${zone}.GAIN ${gain}\n`);
        },
      },
      toggleZoneMute: {
        name: 'Toggle Zone Mute',
        options: [
          {
            type: 'dropdown',
            label: 'Zone',
            id: 'zone',
            default: 'A',
            choices: [
              { id: 'A', label: 'Zone A' },
              { id: 'B', label: 'Zone B' },
              { id: 'C', label: 'Zone C' },
              { id: 'D', label: 'Zone D' },
            ],
          },
        ],
        callback: (action) => {
          const zone = action.options.zone;
          const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zone];
          const currentMute = instance.state.zoneMutes[zid] || false;
          const newMute = currentMute ? 0 : 1;
          instance.socketManager.queueCommand(`SET ZONE-${zone}.MUTE ${newMute}\n`);
        },
      },
      setInputGain: {
        name: 'Set Input Gain',
        options: [
          {
            type: 'number',
            label: 'Input ID (e.g., 100, 102, 200, 400)',
            id: 'iid',
            default: 100,
            min: 100,
            max: 400,
          },
          {
            type: 'number',
            label: 'Gain (dB)',
            id: 'gain',
            default: 0,
            min: -100,
            max: 12,
            step: 0.1,
          },
        ],
        callback: (action) => {
          const iid = parseInt(action.options.iid);
          const gain = parseFloat(action.options.gain).toFixed(1);
          instance.socketManager.queueCommand(`SET IN-${iid}.GAIN ${gain}\n`);
        },
      },
      setZoneSource: {
        name: 'Set Zone Primary Source',
        options: [
          {
            type: 'dropdown',
            label: 'Zone',
            id: 'zone',
            default: 'A',
            choices: [
              { id: 'A', label: 'Zone A' },
              { id: 'B', label: 'Zone B' },
              { id: 'C', label: 'Zone C' },
              { id: 'D', label: 'Zone D' },
            ],
          },
          {
            type: 'number',
            label: 'Source Input ID (e.g., 100, 102, 200, 400)',
            id: 'source',
            default: 100,
            min: 100,
            max: 400,
          },
        ],
        callback: (action) => {
          const zone = action.options.zone;
          const source = parseInt(action.options.source);
          instance.socketManager.queueCommand(`SET ZONE-${zone}.PRIMARY_SRC ${source}\n`);
        },
      },
    };
    instance.setActionDefinitions(actions);
  }
  
  module.exports = { initActions };