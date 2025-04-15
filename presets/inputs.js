module.exports = (instance) => {
  const inputs = [
    { iid: 100, label: 'Input 100' },
    { iid: 101, label: 'Input 101' },
    { iid: 102, label: 'Input 102' },
    { iid: 103, label: 'Input 103' },
    { iid: 200, label: 'Input 200' },
    { iid: 201, label: 'Input 201' },
    { iid: 400, label: 'Generator (400)' },
  ];

  const presets = [];

  // Get Input Count
  presets.push({
    type: 'button',
    category: 'Inputs',
    name: 'Get Input Count',
    style: { text: 'Get Input Count', size: '14', color: '16777215' },
    steps: [{ down: [{ actionId: 'getInputCount', options: {} }], up: [] }],
    feedbacks: [],
  });

  // Get Input EQ Count
  presets.push({
    type: 'button',
    category: 'Input EQ',
    name: 'Get Input EQ Count',
    style: { text: 'Get Input EQ Count', size: '14', color: '16777215' },
    steps: [{ down: [{ actionId: 'getInputEqCount', options: {} }], up: [] }],
    feedbacks: [],
  });

  // Input-specific actions
  inputs.forEach(input => {
    const { iid, label } = input;

    // Get/Set Name
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Get ${label} Name`,
      style: { text: `Get ${label} Name`, size: '14', color: '16777215' },
      steps: [{ down: [{ actionId: 'getInputName', options: { inputId: iid } }], up: [] }],
      feedbacks: [
        {
          feedbackId: 'inputTrim', // Reuse existing feedback to show name and gain
          options: { inputId: iid },
        },
      ],
    });
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Set ${label} Name`,
      style: { text: `Set ${label} Name`, size: '14', color: '16777215' },
      steps: [{ down: [{ actionId: 'setInputName', options: { inputId: iid, value: '' } }], up: [] }],
      feedbacks: [],
    });

    // Get/Set Sensitivity (only for IIDs 100-103)
    if (iid >= 100 && iid <= 103) {
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Get ${label} Sens`,
        style: { text: `Get ${label} Sens`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'getInputSensitivity', options: { inputId: iid } }], up: [] }],
        feedbacks: [
          {
            feedbackId: 'inputSensitivity',
            options: { inputId: iid },
          },
        ],
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Set ${label} Sens`,
        style: { text: `Set ${label} Sens`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'setInputSensitivity', options: { inputId: iid, value: '4DBU' } }], up: [] }],
        feedbacks: [],
      });
    }

    // Get/Set Gain
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Get ${label} Gain`,
      style: { text: `Get ${label} Gain`, size: '14', color: '16777215' },
      steps: [{ down: [{ actionId: 'getInputGain', options: { inputId: iid } }], up: [] }],
      feedbacks: [
        {
          feedbackId: iid === 400 ? 'generatorGain' : 'inputTrim',
          options: { inputId: iid },
        },
      ],
    });
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Set ${label} Gain`,
      style: { text: `Set ${label} Gain`, size: '14', color: '16777215' },
      steps: [{ down: [{ actionId: 'setInputGain', options: { inputId: iid, value: 0 } }], up: [] }],
      feedbacks: [],
    });

    // Get/Set Stereo (only for IIDs 100, 102, 200)
    if ([100, 102, 200].includes(iid)) {
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Get ${label} Stereo`,
        style: { text: `Get ${label} Stereo`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'getInputStereo', options: { inputId: iid } }], up: [] }],
        feedbacks: [],
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Set ${label} Stereo`,
        style: { text: `Set ${label} Stereo`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'setInputStereo', options: { inputId: iid, value: '0' } }], up: [] }],
        feedbacks: [],
      });
    }

    // Get/Set HPF Enable (only for IIDs 100-199)
    if (iid >= 100 && iid <= 199) {
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Get ${label} HPF`,
        style: { text: `Get ${label} HPF`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'getInputHpfEnable', options: { inputId: iid } }], up: [] }],
        feedbacks: [],
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Set ${label} HPF`,
        style: { text: `Set ${label} HPF`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'setInputHpfEnable', options: { inputId: iid, value: '0' } }], up: [] }],
        feedbacks: [],
      });
    }

    // Input EQ actions (only for IIDs 100-199)
    if (iid >= 100 && iid <= 199) {
      // Get/Set EQ Bypass
      presets.push({
        type: 'button',
        category: 'Input EQ',
        name: `Get ${label} EQ Bypass`,
        style: { text: `Get ${label} EQ Bypass`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'getInputEqBypass', options: { inputId: iid } }], up: [] }],
        feedbacks: [],
      });
      presets.push({
        type: 'button',
        category: 'Input EQ',
        name: `Set ${label} EQ Bypass`,
        style: { text: `Set ${label} EQ Bypass`, size: '14', color: '16777215' },
        steps: [{ down: [{ actionId: 'setInputEqBypass', options: { inputId: iid, value: '0' } }], up: [] }],
        feedbacks: [],
      });
    }
  });

  // Generic Configurable EQ Button
  presets.push({
    type: 'button',
    category: 'Input EQ',
    name: 'Configure Input EQ',
    style: { text: 'Configure Input EQ', size: '14', color: '16777215' },
    steps: [
      {
        down: [
          {
            actionId: 'getInputEqBandType', // Default action; will be overridden by options
            options: {
              inputId: 100,
              eqBandId: 1,
              actionType: 'getType', // Custom option to determine which action to trigger
              typeValue: 'PARAMETRIC',
              gainValue: 0,
              freqValue: 100,
              qValue: 0.7,
              bypassValue: '0',
            },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  });

  return presets;
};