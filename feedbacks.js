module.exports = (instance) => ({
	powerOnState: {
	  type: 'advanced',
	  name: 'Power On Indicator',
	  description: 'Show checkmark when amp is on',
	  options: [],
	  callback: () => {
		if (instance.state.power === 'on') {
		  return { text: 'Power On ✓', bgcolor: 2263842 }; // Forest green
		}
		return { text: 'Power On', bgcolor: 0, color: 8421504 }; // Grey
	  },
	},
	powerOffState: {
	  type: 'advanced',
	  name: 'Power Off Indicator',
	  description: 'Show checkmark when amp is off',
	  options: [],
	  callback: () => {
		if (instance.state.power === 'off') {
		  return { text: 'Power Off ✓', bgcolor: 9109504 }; // Dark red
		}
		return { text: 'Power Off', bgcolor: 0, color: 8421504 }; // Grey
	  },
	},
  });