module.exports = function (self) {
    return {
      getInputCount: {
        name: 'Get Input Count',
        options: [],
        callback: async () => {
          self.socket.send('GET IN.COUNT\n');
        },
      },
      getInputName: {
        name: 'Get Input Name',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 400,
          },
        ],
        callback: async (action) => {
          self.socket.send(`GET IN-${action.options.inputId}.NAME\n`);
        },
      },
      setInputName: {
        name: 'Set Input Name',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 400,
          },
          {
            type: 'textinput',
            label: 'Input Name (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET IN-${action.options.inputId}.NAME "${action.options.value}"\n`);
        },
      },
      getInputSensitivity: {
        name: 'Get Input Sensitivity',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 103,
          },
        ],
        callback: async (action) => {
          self.socket.send(`GET IN-${action.options.inputId}.SENS\n`);
        },
      },
      setInputSensitivity: {
        name: 'Set Input Sensitivity',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 103,
          },
          {
            type: 'dropdown',
            label: 'Sensitivity',
            id: 'value',
            default: '4DBU',
            choices: [
              { id: '14DBU', label: '14 DBU' },
              { id: '4DBU', label: '4 DBU' },
              { id: '-10DBV', label: '-10 DBV' },
              { id: 'MIC', label: 'Microphone' },
            ],
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET IN-${action.options.inputId}.SENS "${action.options.value}"\n`);
        },
      },
      getInputGain: {
        name: 'Get Input Gain',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 400,
          },
        ],
        callback: async (action) => {
          self.socket.send(`GET IN-${action.options.inputId}.GAIN\n`);
        },
      },
      setInputGain: {
        name: 'Set Input Gain',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 400,
          },
          {
            type: 'number',
            label: 'Gain (dB)',
            id: 'value',
            default: 0,
            min: -48, // For generator (IID 400)
            max: 15,  // For other inputs
            step: 0.1,
          },
        ],
        callback: async (action) => {
          const gain = parseFloat(action.options.value).toFixed(1);
          self.socket.send(`SET IN-${action.options.inputId}.GAIN ${gain}\n`);
        },
      },
      getInputStereo: {
        name: 'Get Input Stereo',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 200,
            choices: [
              { id: 100, label: 'Input 100' },
              { id: 102, label: 'Input 102' },
              { id: 200, label: 'Input 200' },
            ],
          },
        ],
        callback: async (action) => {
          self.socket.send(`GET IN-${action.options.inputId}.STEREO\n`);
        },
      },
      setInputStereo: {
        name: 'Set Input Stereo',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 200,
            choices: [
              { id: 100, label: 'Input 100' },
              { id: 102, label: 'Input 102' },
              { id: 200, label: 'Input 200' },
            ],
          },
          {
            type: 'dropdown',
            label: 'Stereo State',
            id: 'value',
            default: '0',
            choices: [
              { id: '0', label: 'Mono' },
              { id: '1', label: 'Stereo' },
            ],
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET IN-${action.options.inputId}.STEREO ${action.options.value}\n`);
        },
      },
      getInputHpfEnable: {
        name: 'Get Input HPF Enable',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 199,
          },
        ],
        callback: async (action) => {
          self.socket.send(`GET IN-${action.options.inputId}.HPF_ENABLE\n`);
        },
      },
      setInputHpfEnable: {
        name: 'Set Input HPF Enable',
        options: [
          {
            type: 'number',
            label: 'Input IID',
            id: 'inputId',
            default: 100,
            min: 100,
            max: 199,
          },
          {
            type: 'dropdown',
            label: 'HPF State',
            id: 'value',
            default: '0',
            choices: [
              { id: '0', label: 'Disabled' },
              { id: '1', label: 'Enabled' },
            ],
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET IN-${action.options.inputId}.HPF_ENABLE ${action.options.value}\n`);
        },
      },
    };
  };