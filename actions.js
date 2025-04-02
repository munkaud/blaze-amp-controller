module.exports = (instance) => ({
	powerOn: {
	  name: 'Power On',
	  options: [],
	  callback: async () => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  instance.socket.send('POWER_ON\n');
		  instance.log('info', 'Power On command sent');
		} catch (err) {
		  instance.log('error', `Failed to send Power On: ${err.message}`);
		}
	  },
	},
	powerOff: {
	  name: 'Power Off',
	  options: [],
	  callback: async () => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  instance.socket.send('POWER_OFF\n');
		  instance.log('info', 'Power Off command sent');
		} catch (err) {
		  instance.log('error', `Failed to send Power Off: ${err.message}`);
		}
	  },
	},
	getConfig: {
	  name: 'Get Amp Config',
	  options: [],
	  callback: async () => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  await new Promise(resolve => setTimeout(resolve, 1000));
		  instance.log('debug', 'Sending: GET IN.COUNT\\n');
		  instance.socket.send('GET IN.COUNT\n');
		  instance.log('debug', 'Sending: GET ZONE.COUNT\\n');
		  instance.socket.send('GET ZONE.COUNT\n');
		  instance.log('debug', 'Sending: GET OUT.COUNT\\n');
		  instance.socket.send('GET OUT.COUNT\n');
		  instance.log('info', 'Requested amp configuration');
		} catch (err) {
		  instance.log('error', `Failed to request config: ${err.message}`);
		}
	  },
	},
	setInputGain: {
		name: 'Set Input Trim (Gain)',
		options: [
		  { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 400 },
		  { type: 'number', label: 'Trim (dB)', id: 'gain', default: 0, min: -15, max: 15 },
		],
		callback: async ({ options }) => {
		  if (!instance.socket) return instance.log('error', 'Socket not connected');
		  try {
			instance.socket.send(`SET INPUT_GAIN ${options.inputId} ${options.gain}\n`);
			instance.state.inputGains[options.inputId] = options.gain;
			instance.log('info', `Set trim for input ${options.inputId} to ${options.gain} dB`);
		  } catch (err) {
			instance.log('error', `Failed to set trim: ${err.message}`);
		  }
		},
	  },
	  setInputSensitivity: {
		name: 'Set Input Sensitivity',
		options: [
		  { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 103 },
		  { type: 'dropdown', label: 'Sensitivity', id: 'sensitivity', default: '14DBU',
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
		{ type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 400 },
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
		  { type: 'number', label: 'Gain (dB)', id: 'gain', default: 0, min: -48, max: 0 },
		],
		callback: async ({ options }) => {
		  if (!instance.socket) return instance.log('error', 'Socket not connected');
		  try {
			instance.socket.send(`SET IN-400.GAIN ${options.gain}\n`);
			instance.state.generatorGain = options.gain;
			instance.log('info', `Set generator gain to ${options.gain} dB`);
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
	});