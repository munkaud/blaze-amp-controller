module.exports = function (self) {
  return {
    getZoneCount: {
      name: 'Get Zone Count',
      options: [],
      callback: async () => {
        self.socket.send('GET ZONE.COUNT\n');
      },
    },
    getZoneName: {
      name: 'Get Zone Name',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.NAME\n`);
      },
    },
    setZoneName: {
      name: 'Set Zone Name',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
        {
          type: 'textinput',
          label: 'Name (max 32 chars)',
          id: 'value',
          default: '',
          regex: '/^.{0,32}$/',
        },
      ],
      callback: async (action) => {
        const name = action.options.value.slice(0, 32); // Ensure max length
        self.socket.send(`SET ZONE-${action.options.zoneId}.NAME "${name}"\n`);
      },
    },
    getZonePrimarySrc: {
      name: 'Get Zone Primary Source',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.PRIMARY_SRC\n`);
      },
    },
    setZonePrimarySrc: {
      name: 'Set Zone Primary Source',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Input Source (IID)',
          id: 'value',
          default: '100',
          choices: [
            { id: '100', label: 'Input 100' },
            { id: '101', label: 'Input 101' },
            { id: '102', label: 'Input 102' },
            { id: '103', label: 'Input 103' },
            { id: '200', label: 'Input 200' },
            { id: '201', label: 'Input 201' },
            { id: '400', label: 'Generator (400)' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.PRIMARY_SRC ${action.options.value}\n`);
      },
    },
    getZonePrioritySrc: {
      name: 'Get Zone Priority Source',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.PRIORITY_SRC\n`);
      },
    },
    setZonePrioritySrc: {
      name: 'Set Zone Priority Source',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Input Source (IID)',
          id: 'value',
          default: '100',
          choices: [
            { id: '100', label: 'Input 100' },
            { id: '101', label: 'Input 101' },
            { id: '102', label: 'Input 102' },
            { id: '103', label: 'Input 103' },
            { id: '200', label: 'Input 200' },
            { id: '201', label: 'Input 201' },
            { id: '400', label: 'Generator (400)' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.PRIORITY_SRC ${action.options.value}\n`);
      },
    },
    getZoneGain: {
      name: 'Get Zone Gain',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.GAIN\n`);
      },
    },
    setZoneGain: {
      name: 'Set Zone Gain',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          id: 'value',
          default: 0,
          min: -80,
          max: 0,
          step: 0.1,
        },
      ],
      callback: async (action) => {
        const gain = parseFloat(action.options.value).toFixed(1);
        self.socket.send(`SET ZONE-${action.options.zoneId}.GAIN ${gain}\n`);
      },
    },
    getZoneGainMin: {
      name: 'Get Zone Gain Min',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.GAIN_MIN\n`);
      },
    },
    setZoneGainMin: {
      name: 'Set Zone Gain Min',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Gain Min (dB)',
          id: 'value',
          default: -80,
          min: -80,
          max: 0,
          step: 0.1,
        },
      ],
      callback: async (action) => {
        const gainMin = parseFloat(action.options.value).toFixed(1);
        self.socket.send(`SET ZONE-${action.options.zoneId}.GAIN_MIN ${gainMin}\n`);
      },
    },
    getZoneGainMax: {
      name: 'Get Zone Gain Max',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.GAIN_MAX\n`);
      },
    },
    setZoneGainMax: {
      name: 'Set Zone Gain Max',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Gain Max (dB)',
          id: 'value',
          default: 0,
          min: -80,
          max: 0,
          step: 0.1,
        },
      ],
      callback: async (action) => {
        const gainMax = parseFloat(action.options.value).toFixed(1);
        self.socket.send(`SET ZONE-${action.options.zoneId}.GAIN_MAX ${gainMax}\n`);
      },
    },
    getZoneStereo: {
      name: 'Get Zone Stereo',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'C', label: 'Zone C' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.STEREO\n`);
      },
    },
    setZoneStereo: {
      name: 'Set Zone Stereo',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'C', label: 'Zone C' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Stereo State',
          id: 'value',
          default: '0',
          choices: [
            { id: '0', label: 'Disabled' },
            { id: '1', label: 'Enabled' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.STEREO ${action.options.value}\n`);
      },
    },
    getZoneGpioVc: {
      name: 'Get Zone GPIO Volume Control',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.GPIO_VC\n`);
      },
    },
    setZoneGpioVc: {
      name: 'Set Zone GPIO Volume Control',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Volume Control ID (0 for OFF)',
          id: 'value',
          default: 0,
          min: 0,
          max: 255,
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.GPIO_VC ${action.options.value}\n`);
      },
    },
    getZoneMute: {
      name: 'Get Zone Mute',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.MUTE\n`);
      },
    },
    setZoneMute: {
      name: 'Set Zone Mute',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Mute State',
          id: 'value',
          default: '0',
          choices: [
            { id: '0', label: 'Unmuted' },
            { id: '1', label: 'Muted' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.MUTE ${action.options.value}\n`);
      },
    },
    getZoneMuteEnable: {
      name: 'Get Zone Mute Enable',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.MUTE_ENABLE\n`);
      },
    },
    setZoneMuteEnable: {
      name: 'Set Zone Mute Enable',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Mute Enable State',
          id: 'value',
          default: '0',
          choices: [
            { id: '0', label: 'Disabled' },
            { id: '1', label: 'Enabled' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.MUTE_ENABLE ${action.options.value}\n`);
      },
    },
    getZoneSrcEnabled: {
      name: 'Get Zone Source Enabled',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Source (SID)',
          id: 'sourceId',
          default: '100',
          choices: [
            { id: '100', label: 'Input 100' },
            { id: '101', label: 'Input 101' },
            { id: '102', label: 'Input 102' },
            { id: '103', label: 'Input 103' },
            { id: '200', label: 'Input 200' },
            { id: '201', label: 'Input 201' },
            { id: '400', label: 'Generator (400)' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.SRC-${action.options.sourceId}.ENABLED\n`);
      },
    },
    setZoneSrcEnabled: {
      name: 'Set Zone Source Enabled',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Source (SID)',
          id: 'sourceId',
          default: '100',
          choices: [
            { id: '100', label: 'Input 100' },
            { id: '101', label: 'Input 101' },
            { id: '102', label: 'Input 102' },
            { id: '103', label: 'Input 103' },
            { id: '200', label: 'Input 200' },
            { id: '201', label: 'Input 201' },
            { id: '400', label: 'Generator (400)' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Enabled State',
          id: 'value',
          default: '1',
          choices: [
            { id: '0', label: 'Disabled' },
            { id: '1', label: 'Enabled' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.SRC-${action.options.sourceId}.ENABLED ${action.options.value}\n`);
      },
    },
    getZoneDuckerMode: {
      name: 'Get Zone Ducker Mode',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.MODE\n`);
      },
    },
    setZoneDuckerMode: {
      name: 'Set Zone Ducker Mode',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Ducker Mode',
          id: 'value',
          default: 'OFF',
          choices: [
            { id: 'OFF', label: 'Off' },
            { id: 'DUCKER', label: 'Ducker' },
            { id: 'OVERRIDE', label: 'Override' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.MODE ${action.options.value}\n`);
      },
    },
    getZoneDuckerAuto: {
      name: 'Get Zone Ducker Auto',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.AUTO\n`);
      },
    },
    setZoneDuckerAuto: {
      name: 'Set Zone Ducker Auto',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Auto State',
          id: 'value',
          default: '0',
          choices: [
            { id: '0', label: 'Disabled' },
            { id: '1', label: 'Enabled' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.AUTO ${action.options.value}\n`);
      },
    },
    getZoneDuckerThreshold: {
      name: 'Get Zone Ducker Threshold',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.THRESHOLD\n`);
      },
    },
    setZoneDuckerThreshold: {
      name: 'Set Zone Ducker Threshold',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Threshold (dB)',
          id: 'value',
          default: -10,
          min: -80,
          max: 0,
          step: 0.1,
        },
      ],
      callback: async (action) => {
        const threshold = parseFloat(action.options.value).toFixed(1);
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.THRESHOLD ${threshold}\n`);
      },
    },
    getZoneDuckerDepth: {
      name: 'Get Zone Ducker Depth',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.DEPTH\n`);
      },
    },
    setZoneDuckerDepth: {
      name: 'Set Zone Ducker Depth',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Depth (dB)',
          id: 'value',
          default: -10,
          min: -144,
          max: 0,
          step: 0.1,
        },
      ],
      callback: async (action) => {
        const depth = parseFloat(action.options.value).toFixed(1);
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.DEPTH ${depth}\n`);
      },
    },
    getZoneDuckerAttack: {
      name: 'Get Zone Ducker Attack',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.ATTACK\n`);
      },
    },
    setZoneDuckerAttack: {
      name: 'Set Zone Ducker Attack',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Attack (seconds)',
          id: 'value',
          default: 0.050,
          min: 0.001,
          max: 0.2,
          step: 0.001,
        },
      ],
      callback: async (action) => {
        const attack = parseFloat(action.options.value).toFixed(3);
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.ATTACK ${attack}\n`);
      },
    },
    getZoneDuckerRelease: {
      name: 'Get Zone Ducker Release',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.RELEASE\n`);
      },
    },
    setZoneDuckerRelease: {
      name: 'Set Zone Ducker Release',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Release (seconds)',
          id: 'value',
          default: 0.500,
          min: 0.010,
          max: 10.0,
          step: 0.001,
        },
      ],
      callback: async (action) => {
        const release = parseFloat(action.options.value).toFixed(3);
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.RELEASE ${release}\n`);
      },
    },
    getZoneDuckerHold: {
      name: 'Get Zone Ducker Hold',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.HOLD\n`);
      },
    },
    setZoneDuckerHold: {
      name: 'Set Zone Ducker Hold',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Hold (seconds)',
          id: 'value',
          default: 0,
          min: 0,
          max: 10,
          step: 0.001,
        },
      ],
      callback: async (action) => {
        const hold = parseFloat(action.options.value).toFixed(3);
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.HOLD ${hold}\n`);
      },
    },
    getZoneDuckerOverrideGain: {
      name: 'Get Zone Ducker Override Gain',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.OVERRIDE_GAIN\n`);
      },
    },
    setZoneDuckerOverrideGain: {
      name: 'Set Zone Ducker Override Gain',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Override Gain (dB)',
          id: 'value',
          default: 0,
          min: -60,
          max: 15,
          step: 0.1,
        },
      ],
      callback: async (action) => {
        const overrideGain = parseFloat(action.options.value).toFixed(1);
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.OVERRIDE_GAIN ${overrideGain}\n`);
      },
    },
    getZoneDuckerOverrideGainEnable: {
      name: 'Get Zone Ducker Override Gain Enable',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`GET ZONE-${action.options.zoneId}.DUCK.OVERRIDE_GAIN_ENABLE\n`);
      },
    },
    setZoneDuckerOverrideGainEnable: {
      name: 'Set Zone Ducker Override Gain Enable',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zoneId',
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
          label: 'Override Gain Enable State',
          id: 'value',
          default: '0',
          choices: [
            { id: '0', label: 'Disabled' },
            { id: '1', label: 'Enabled' },
          ],
        },
      ],
      callback: async (action) => {
        self.socket.send(`SET ZONE-${action.options.zoneId}.DUCK.OVERRIDE_GAIN_ENABLE ${action.options.value}\n`);
      },
    },
  };
};