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
	inputSensitivity: {
		type: 'advanced',
		name: 'Input Sensitivity Display',
		description: 'Updates button text with current sensitivity and stereo/mono status',
		options: [
		  { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 103 },
		],
		callback: ({ options }) => {
		  const name = instance.state.inputNames[options.inputId] || `Input ${options.inputId}`;
		  const sens = instance.state.inputSensitivities[options.inputId] || 'Unknown';
		  let stereoStatus = '';
		  if (options.inputId === 100 || options.inputId === 102) {
			stereoStatus = instance.state.stereoPairs[options.inputId] === true ? ' (Stereo)' : ' (Mono)';
		  } else if (options.inputId === 101) {
			stereoStatus = instance.state.stereoPairs[100] === true ? ' (Stereo)' : ' (Mono)';
		  } else if (options.inputId === 103) {
			stereoStatus = instance.state.stereoPairs[102] === true ? ' (Stereo)' : ' (Mono)';
		  }
		  return { text: `${name} Sens: ${sens}${stereoStatus}` };
		},
	  },
	  inputTrim: {
		type: 'advanced',
		name: 'Input Trim Display',
		description: 'Updates button text with current trim and stereo/mono status',
		options: [
		  { type: 'number', label: 'Input IID', id: 'inputId', default: 100, min: 100, max: 400 },
		],
		callback: ({ options }) => {
		  const name = instance.state.inputNames[options.inputId] || `Input ${options.inputId}`;
		  const trim = instance.state.inputGains[options.inputId] !== undefined ? instance.state.inputGains[options.inputId] : 'Unknown';
		  let stereoStatus = '';
		  if (options.inputId === 100 || options.inputId === 102 || options.inputId === 200) {
			stereoStatus = instance.state.stereoPairs[options.inputId] === true ? ' (Stereo)' : ' (Mono)';
		  } else if (options.inputId === 101) {
			stereoStatus = instance.state.stereoPairs[100] === true ? ' (Stereo)' : ' (Mono)';
		  } else if (options.inputId === 103) {
			stereoStatus = instance.state.stereoPairs[102] === true ? ' (Stereo)' : ' (Mono)';
		  } else if (options.inputId === 201) {
			stereoStatus = instance.state.stereoPairs[200] === true ? ' (Stereo)' : ' (Mono)';
		  }
		  return { text: `${name} Trim: ${trim}${stereoStatus}` };
		},
	  },
	  generatorGain: {
		type: 'advanced',
		name: 'Generator Gain Display',
		description: 'Updates button text with current generator gain',
		options: [],
		callback: () => {
		  const name = instance.state.inputNames[400] || 'Generator';
		  const gain = instance.state.generatorGain !== null ? instance.state.generatorGain : 'Unknown';
		  return { text: `${name} Gain: ${gain}` };
		},
	  },
	});