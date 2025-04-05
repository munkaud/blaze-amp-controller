const poller = require('./lib/poller');

module.exports = function (instance){
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
				  await new Promise(resolve => setTimeout(resolve, 100)); // Wait 1msec
				} else {
				  instance.log('debug', `Power already ${options.state}, skipping command`);
				}
				instance.socket.send('GET SYSTEM.STATUS.STATE\n');
				instance.updatePresets();
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
			  instance.log('debug', 'Polling power state');
			  instance.socket.send('GET SYSTEM.STATUS.STATE\n'); // Update here
			  instance.updatePresets();
			},
		  },
		  getConfig: {
			label: 'Get Config',
			callback: () => {
			  instance.log('info', 'Manual config poll triggered');
			  poller.pollConfig(instance);
			  instance.updatePresets();
			},
		  },
	setInputGain: {
	  name: 'Set Input Trim (Gain)',
	  options: [
		{ type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 400 },
		{ 
		  type: 'number', 
		  label: 'Trim (dB)', 
		  id: 'gain', 
		  default: 0, 
		  min: -15, 
		  max: 15, 
		  range: true, 
		  step: 1 
		},
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
		  instance.log('debug', `Sending: GET IN-${options.iid}.NAME\\n`);
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
		  instance.log('debug', `Sending: GET IN-${options.inputId}.SENS\\n`);
		  instance.socket.send(`GET IN-${options.inputId}.SENS\n`);
		} catch (err) {
		  instance.log('error', `Failed to get sensitivity: ${err.message}`);
		}
	  },
	},
	setGeneratorGain: {
	  name: 'Set Generator Gain',
	  options: [
		{ 
		  type: 'number', 
		  label: 'Gain (dB)', 
		  id: 'gain', 
		  default: 0, 
		  min: -48, 
		  max: 0, 
		  range: true, 
		  step: 1 
		},
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
		  instance.log('debug', `Sending: GET IN-${options.inputId}.GAIN\\n`);
		  instance.socket.send(`GET IN-${options.inputId}.GAIN\n`);
		} catch (err) {
		  instance.log('error', `Failed to get trim: ${err.message}`);
		}
	  },
	},
  }
}