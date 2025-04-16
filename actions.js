module.exports = function (instance) {
    return {
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
          const zid = zone.charCodeAt(0) - 64; // A=1, B=2, etc.
          const currentMute = instance.state.zoneMutes[zid] || false;
          const newMute = currentMute ? 0 : 1;
          instance.socketManager.queueCommand(`SET ZONE-${zone}.MUTE ${newMute}\n`);
          instance.log('info', `Toggling mute for Zone ${zone} to ${newMute}`);
        },
      },
      setZoneSource: {
        name: 'Set Zone Source',
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
            type: 'dropdown',
            label: 'Source',
            id: 'source',
            default: '100',
            choices: [
              { id: '100', label: 'Input 100' },
              { id: '102', label: 'Input 102' },
              { id: '200', label: 'Input 200' },
              { id: '400', label: 'Input 400' },
            ],
          },
        ],
        callback: (action) => {
          const zone = action.options.zone;
          const source = action.options.source;
          instance.socketManager.queueCommand(`SET ZONE-${zone}.SRC ${source}\n`);
          instance.log('info', `Setting Zone ${zone} source to Input ${source}`);
        },
      },
      setPower: {
        name: 'Set Power State',
        options: [
          {
            type: 'dropdown',
            label: 'Power State',
            id: 'state',
            default: 'ON',
            choices: [
              { id: 'ON', label: 'Power On' },
              { id: 'OFF', label: 'Power Off' },
            ],
          },
        ],
        callback: (action) => {
          const command = action.options.state === 'ON' ? 'POWER_ON' : 'POWER_OFF';
          instance.socketManager.queueCommand(`${command}\n`);
          instance.log('info', `Setting power state to ${action.options.state}`);
        },
      },
      getPower: {
        name: 'Get Power State',
        options: [],
        callback: () => {
          instance.socketManager.queueCommand('GET SYSTEM.STATUS.STATE\n');
          instance.log('info', 'Requesting power state');
        },
      },
      setOutputZone: {
        name: 'Set Output Zone',
        options: [
          {
            type: 'number',
            label: 'Output ID',
            id: 'output',
            default: 1,
            min: 1,
            max: 4,
          },
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
          const outputId = action.options.output;
          const zone = action.options.zone;
          instance.socketManager.queueCommand(`SET OUT-${outputId}.SRC ${zone}\n`);
          instance.log('info', `Setting Output ${outputId} to Zone ${zone}`);
        },
      },
    };
  };