module.exports = (instance) => ({
	powerOnState: { /* unchanged */ },
	powerOffState: { /* unchanged */ },
	inputMuteState: {
	  type: 'advanced',
	  name: 'Input Mute State',
	  description: 'Show mute status for an input',
	  options: [
		{ type: 'number', label: 'Input ID', id: 'inputId', default: 1, min: 1, max: 10 },
	  ],
	  callback: ({ options }) => {
		// Placeholder: Need GET INPUT_MUTE to track state
		return { bgcolor: '0' }; // TBD with real mute state
	  },
	},
  });