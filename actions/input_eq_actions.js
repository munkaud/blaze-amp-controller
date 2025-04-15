module.exports = function (self) {
    return {
      getInputEqCount: {
        name: 'Get Input EQ Count',
        options: [],
        callback: async () => {
          self.socket.send('GET IN.EQ.COUNT\n');
        },
      },
      getInputEqBypass: {
        name: 'Get Input EQ Bypass',
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
          self.socket.send(`GET IN-${action.options.inputId}.EQ.BYPASS\n`);
        },
      },
      setInputEqBypass: {
        name: 'Set Input EQ Bypass',
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
            label: 'Bypass State',
            id: 'value',
            default: '0',
            choices: [
              { id: '0', label: 'Enabled' },
              { id: '1', label: 'Bypassed' },
            ],
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET IN-${action.options.inputId}.EQ.BYPASS ${action.options.value}\n`);
        },
      },
      configureInputEq: {
        name: 'Configure Input EQ',
        options: [
          {
            type: 'dropdown',
            label: 'Input IID',
            id: 'inputId',
            default: '100',
            choices: [
              { id: '100', label: 'Input 100' },
              { id: '101', label: 'Input 101' },
              { id: '102', label: 'Input 102' },
              { id: '103', label: 'Input 103' },
            ],
          },
          {
            type: 'dropdown',
            label: 'EQ Band EID',
            id: 'eqBandId',
            default: '1',
            choices: [
              { id: '1', label: 'Band 1' },
              { id: '2', label: 'Band 2' },
              { id: '3', label: 'Band 3' },
              { id: '4', label: 'Band 4' },
              { id: '5', label: 'Band 5' },
            ],
          },
          {
            type: 'dropdown',
            label: 'Action Type',
            id: 'actionType',
            default: 'getType',
            choices: [
              { id: 'getType', label: 'Get Type' },
              { id: 'setType', label: 'Set Type' },
              { id: 'getGain', label: 'Get Gain' },
              { id: 'setGain', label: 'Set Gain' },
              { id: 'getFreq', label: 'Get Frequency' },
              { id: 'setFreq', label: 'Set Frequency' },
              { id: 'getQ', label: 'Get Q' },
              { id: 'setQ', label: 'Set Q' },
              { id: 'getBypass', label: 'Get Bypass' },
              { id: 'setBypass', label: 'Set Bypass' },
            ],
          },
          {
            type: 'dropdown',
            label: 'EQ Type (for Set Type)',
            id: 'typeValue',
            default: 'PARAMETRIC',
            choices: [
              { id: 'PARAMETRIC', label: 'Parametric' },
              { id: 'LOWPASS_12', label: 'Lowpass 12 dB/oct' },
              { id: 'HIGHPASS_12', label: 'Highpass 12 dB/oct' },
              { id: 'LOW_SHELF_Q', label: 'Low Shelf' },
              { id: 'HIGH_SHELF_Q', label: 'High Shelf' },
            ],
          },
          {
            type: 'number',
            label: 'Gain (dB, for Set Gain)',
            id: 'gainValue',
            default: 0,
            min: -15,
            max: 15,
            step: 0.1,
          },
          {
            type: 'number',
            label: 'Frequency (Hz, for Set Frequency)',
            id: 'freqValue',
            default: 100,
            min: 20,
            max: 20000,
            step: 1,
          },
          {
            type: 'number',
            label: 'Q (for Set Q)',
            id: 'qValue',
            default: 0.7,
            min: 0.4,
            max: 30,
            step: 0.1,
          },
          {
            type: 'dropdown',
            label: 'Bypass State (for Set Bypass)',
            id: 'bypassValue',
            default: '0',
            choices: [
              { id: '0', label: 'Enabled' },
              { id: '1', label: 'Bypassed' },
            ],
          },
        ],
        callback: async (action) => {
          const { inputId, eqBandId, actionType } = action.options;
          const baseCommand = `IN-${inputId}.EQ-${eqBandId}`;
  
          switch (actionType) {
            case 'getType':
              self.socket.send(`GET ${baseCommand}.TYPE\n`);
              break;
            case 'setType':
              self.socket.send(`SET ${baseCommand}.TYPE ${action.options.typeValue}\n`);
              break;
            case 'getGain':
              self.socket.send(`GET ${baseCommand}.GAIN\n`);
              break;
            case 'setGain':
              const gain = parseFloat(action.options.gainValue).toFixed(1);
              self.socket.send(`SET ${baseCommand}.GAIN ${gain}\n`);
              break;
            case 'getFreq':
              self.socket.send(`GET ${baseCommand}.FREQ\n`);
              break;
            case 'setFreq':
              const freq = parseFloat(action.options.freqValue).toFixed(1);
              self.socket.send(`SET ${baseCommand}.FREQ ${freq}\n`);
              break;
            case 'getQ':
              self.socket.send(`GET ${baseCommand}.Q\n`);
              break;
            case 'setQ':
              const q = parseFloat(action.options.qValue).toFixed(1);
              self.socket.send(`SET ${baseCommand}.Q ${q}\n`);
              break;
            case 'getBypass':
              self.socket.send(`GET ${baseCommand}.BYPASS\n`);
              break;
            case 'setBypass':
              self.socket.send(`SET ${baseCommand}.BYPASS ${action.options.bypassValue}\n`);
              break;
            default:
              self.log('warn', `Unknown EQ action type: ${actionType}`);
          }
        },
      },
    };
  };