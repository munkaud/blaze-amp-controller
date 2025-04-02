module.exports = (instance) => ({
	powerOn: { /* unchanged */ },
	powerOff: { /* unchanged */ },
	getConfig: { /* unchanged */ },
	muteInput: {
	  name: 'Mute Input',
	  options: [
		{ type: 'number', label: 'Input ID', id: 'inputId', default: 1, min: 1, max: 10 },
		{ type: 'checkbox', label: 'Mute', id: 'mute', default: true },
	  ],
	  callback: async ({ options }) => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  const cmd = options.mute ? `MUTE_ON ${options.inputId}\n` : `MUTE_OFF ${options.inputId}\n`;
		  instance.socket.send(cmd);
		  instance.log('info', `${options.mute ? 'Muted' : 'Unmuted'} input ${options.inputId}`);
		} catch (err) {
		  instance.log('error', `Failed to mute input: ${err.message}`);
		}
	  },
	},
	setInputGain: {
	  name: 'Set Input Gain',
	  options: [
		{ type: 'number', label: 'Input ID', id: 'inputId', default: 1, min: 1, max: 10 },
		{ type: 'number', label: 'Gain (dB)', id: 'gain', default: 0, min: -100, max: 12 },
	  ],
	  callback: async ({ options }) => {
		if (!instance.socket) return instance.log('error', 'Socket not connected');
		try {
		  instance.socket.send(`SET INPUT_GAIN ${options.inputId} ${options.gain}\n`);
		  instance.log('info', `Set gain for input ${options.inputId} to ${options.gain} dB`);
		} catch (err) {
		  instance.log('error', `Failed to set gain: ${err.message}`);
		}
	  },
	},
  });