const poller = require('../lib/poller');

module.exports = function (instance) {
  return {
    setPower: {
      name: 'Set Power',
      options: [
        { type: 'dropdown', label: 'Power State', id: 'state', default: 'ON', choices: [{ id: 'ON', label: 'On' }, { id: 'OFF', label: 'Off' }] },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          const command = options.state === 'ON' ? 'POWER_ON\n' : 'POWER_OFF\n';
          if (instance.state.power !== options.state) {
            instance.socket.send(command);
            instance.log('info', `Power ${options.state} command sent`);
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
          } // else { instance.log('debug', `Power already ${options.state}, skipping command`); }
          instance.socket.send('GET SYSTEM.STATUS.STATE\n');
        } catch (err) {
          instance.log('error', `Failed to set power: ${err.message}`);
        }
      },
    },
    getPower: {
      name: 'Get Power',
      options: [],
      callback: () => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        // instance.log('debug', 'Polling power state');
        instance.socket.send('GET SYSTEM.STATUS.STATE\n');
      },
    },
    getConfig: {
      label: 'Get Config',
      callback: () => {
        // instance.log('info', 'Manual config poll triggered');
        poller.pollConfig(instance);
      },
    },
    setInputGain: {
      name: 'Set Input Trim (Gain)',
      options: [
        { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 400 },
        { type: 'number', label: 'Trim (dB)', id: 'gain', default: 0, min: -15, max: 15, range: true, step: 1 },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          instance.socket.send(`SET IN-${options.inputId}.GAIN ${options.gain}\n`);
          instance.state.inputGains[options.inputId] = options.gain;
          instance.log('info', `Set trim for input ${options.inputId} to ${options.gain} dB`);
          instance.socket.send(`GET IN-${options.inputId}.GAIN\n`);
        } catch (err) {
          instance.log('error', `Failed to set trim: ${err.message}`);
        }
      },
    },
    setInputSensitivity: {
      name: 'Set Input Sensitivity',
      options: [
        { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 103 },
        { 
          type: 'dropdown', 
          label: 'Sensitivity', 
          id: 'sensitivity', 
          default: '14DBU',
          choices: [
            { id: '14DBU', label: '+14 dBu' },
            { id: '4DBU', label: '+4 dBu' },
            { id: '-10DBV', label: '-10 dBV' },
            { id: 'MIC', label: 'Mic' },
          ],
        },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          instance.socket.send(`SET IN-${options.inputId}.SENS ${options.sensitivity}\n`);
          instance.state.inputSensitivities[options.inputId] = options.sensitivity;
          instance.log('info', `Set sensitivity for input ${options.inputId} to ${options.sensitivity}`);
          instance.socket.send(`GET IN-${options.inputId}.SENS\n`);
        } catch (err) {
          instance.log('error', `Failed to set sensitivity: ${err.message}`);
        }
      },
    },
    getInputName: {
      name: 'Get Input Name',
      options: [
        { type: 'number', label: 'Input IID', id: 'iid', default: 100, min: 100, max: 400 },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          // instance.log('debug', `Sending: GET IN-${options.iid}.NAME\\n`);
          instance.socket.send(`GET IN-${options.iid}.NAME\n`);
        } catch (err) {
          instance.log('error', `Failed to get input name: ${err.message}`);
        }
      },
    },
    getInputSensitivity: {
      name: 'Get Input Sensitivity',
      options: [
        { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 103 },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          // instance.log('debug', `Sending: GET IN-${options.inputId}.SENS\\n`);
          instance.socket.send(`GET IN-${options.inputId}.SENS\n`);
        } catch (err) {
          instance.log('error', `Failed to get sensitivity: ${err.message}`);
        }
      },
    },
    setGeneratorGain: {
      name: 'Set Generator Gain',
      options: [
        { type: 'number', label: 'Gain (dB)', id: 'gain', default: 0, min: -48, max: 0, range: true, step: 1 },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          instance.socket.send(`SET IN-400.GAIN ${options.gain}\n`);
          instance.state.generatorGain = options.gain;
          instance.log('info', `Set generator gain to ${options.gain} dB`);
          instance.socket.send(`GET IN-400.GAIN\n`);
        } catch (err) {
          instance.log('error', `Failed to set generator gain: ${err.message}`);
        }
      },
    },
    getInputTrim: {
      name: 'Get Input Trim',
      options: [
        { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 400 },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          // instance.log('debug', `Sending: GET IN-${options.inputId}.GAIN\\n`);
          instance.socket.send(`GET IN-${options.inputId}.GAIN\n`);
        } catch (err) {
          instance.log('error', `Failed to get trim: ${err.message}`);
        }
      },
    },
    getZoneConfig: {
      name: 'Get Zone Config',
      options: [
        { type: 'number', label: 'Zone ID', id: 'zoneId', default: 1, min: 1, max: 4 },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          const zoneLetter = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' }[options.zoneId];
          const isPrimary = options.zoneId === 1 || options.zoneId === 3;
          if (isPrimary) {
            // instance.log('debug', `Sending: GET ZONE-${zoneLetter}.STEREO\\n`);
            instance.socket.send(`GET ZONE-${zoneLetter}.STEREO\n`);
          } // else { instance.log('debug', `Skipping STEREO for non-primary zone ${options.zoneId}`); }
          instance.socket.send(`GET ZONE-${zoneLetter}.NAME\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.GAIN\n`);
        } catch (err) {
          instance.log('error', `Failed to get zone config: ${err.message}`);
        }
      },
    },
    setZoneStereo: {
      name: 'Set Zone Stereo',
      options: [
        { type: 'number', label: 'Zone ID', id: 'zoneId', default: 1, min: 1, max: 4 },
        { type: 'dropdown', label: 'Stereo', id: 'stereo', default: '0', choices: [{ id: '0', label: 'Mono' }, { id: '1', label: 'Stereo' }] },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          const zoneLetter = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' }[options.zoneId];
          if (options.zoneId === 1 || options.zoneId === 3) {
            instance.socket.send(`SET ZONE-${zoneLetter}.STEREO ${options.stereo}\n`);
            instance.log('info', `Set zone ${options.zoneId} stereo to ${options.stereo}`);
            instance.socket.send(`GET ZONE-${zoneLetter}.STEREO\n`);
          } else {
            instance.log('warn', `Zone ${options.zoneId} is not a primary zone, cannot set stereo`);
          }
        } catch (err) {
          instance.log('error', `Failed to set zone stereo: ${err.message}`);
        }
      },
    },
    linkZone: {
      name: 'Link Zone Stereo',
      options: [
        { type: 'number', label: 'Zone ID', id: 'zoneId', default: 1, min: 1, max: 4 },
        { type: 'checkbox', label: 'Stereo', id: 'stereo', default: false },
      ],
      callback: async ({ options }) => {
        if (!instance.socket) return instance.log('error', 'Socket not connected');
        try {
          const zoneLetter = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' }[options.zoneId];
          if (options.zoneId === 1 || options.zoneId === 3) {
            instance.socket.send(`SET ZONE-${zoneLetter}.STEREO ${options.stereo ? 1 : 0}\n`);
            instance.log('info', `Set zone ${options.zoneId} stereo to ${options.stereo}`);
            instance.socket.send(`GET ZONE-${zoneLetter}.STEREO\n`);
          } else {
            instance.log('warn', `Zone ${options.zoneId} is not a primary zone, cannot link`);
          }
        } catch (err) {
          instance.log('error', `Failed to link zone: ${err.message}`);
        }
      },
    },
  };
};