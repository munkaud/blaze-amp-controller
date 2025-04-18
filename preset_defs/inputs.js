const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
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
    style: { text: 'Get Input Count', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
    steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET IN.COUNT', value: '' } }], up: [] }],
    feedbacks: []
  });

  // Get Input EQ Count
  presets.push({
    type: 'button',
    category: 'Input EQ',
    name: 'Get Input EQ Count',
    style: { text: 'Get Input EQ Count', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
    steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET IN.EQ.COUNT', value: '' } }], up: [] }],
    feedbacks: []
  });

  // Input-specific actions
  inputs.forEach(input => {
    const { iid, label } = input;

    // Get/Set Name
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Get ${label} Name`,
      style: { text: `Get ${label} Name`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.NAME`, value: '' } }], up: [] }],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Set ${label} Name`,
      style: { text: `Set ${label} Name`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: `SET IN-${iid}.NAME Input${iid}`, value: '' } }], up: [] }],
      feedbacks: []
    });

    // Get/Set Sensitivity (IIDs 100-103)
    if (iid >= 100 && iid <= 103) {
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Get ${label} Sens`,
        style: { text: `Get ${label} Sens`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.SENS`, value: '' } }], up: [] }],
        feedbacks: []
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Set ${label} Sens`,
        style: { text: `Set ${label} Sens`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `SET IN-${iid}.SENS 4DBU`, value: '' } }], up: [] }],
        feedbacks: []
      });
    }

    // Get/Set Gain
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Get ${label} Gain`,
      style: { text: `Get ${label} Gain`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.GAIN`, value: '' } }], up: [] }],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Set ${label} Gain`,
      style: { text: `Set ${label} Gain`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: `SET IN-${iid}.GAIN 0`, value: '' } }], up: [] }],
      feedbacks: []
    });

    // Get/Set Stereo (IIDs 100, 102, 200)
    if ([100, 102, 200].includes(iid)) {
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Get ${label} Stereo`,
        style: { text: `Get ${label} Stereo`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.STEREO`, value: '' } }], up: [] }],
        feedbacks: []
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Set ${label} Stereo`,
        style: { text: `Set ${label} Stereo`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `SET IN-${iid}.STEREO 0`, value: '' } }], up: [] }],
        feedbacks: []
      });
    }

    // Get/Set HPF Enable (IIDs 100-199)
    if (iid >= 100 && iid <= 199) {
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Get ${label} HPF`,
        style: { text: `Get ${label} HPF`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.HPF_ENABLE`, value: '' } }], up: [] }],
        feedbacks: []
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Set ${label} HPF`,
        style: { text: `Set ${label} HPF`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `SET IN-${iid}.HPF_ENABLE 0`, value: '' } }], up: [] }],
        feedbacks: []
      });
    }

    // Get/Set EQ Bypass (IIDs 100-199)
    if (iid >= 100 && iid <= 199) {
      presets.push({
        type: 'button',
        category: 'Input EQ',
        name: `Get ${label} EQ Bypass`,
        style: { text: `Get ${label} EQ Bypass`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.EQ.BYPASS`, value: '' } }], up: [] }],
        feedbacks: []
      });
      presets.push({
        type: 'button',
        category: 'Input EQ',
        name: `Set ${label} EQ Bypass`,
        style: { text: `Set ${label} EQ Bypass`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [{ down: [{ actionId: 'sendCommand', options: { command: `SET IN-${iid}.EQ.BYPASS 0`, value: '' } }], up: [] }],
        feedbacks: []
      });
    }
  });

  // Configurable EQ Button
  presets.push({
    type: 'button',
    category: 'Input EQ',
    name: 'Configure Input EQ',
    style: { text: 'Configure Input EQ', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
    steps: [
      {
        down: [
          { actionId: 'sendCommand', options: { command: 'GET IN-100.EQ-1.TYPE', value: '' } }
        ],
        up: []
      }
    ],
    feedbacks: []
  });

  // Missing Dynamic Commands
  inputs.forEach(input => {
    const { iid, label } = input;
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Get ${label} Signal`,
      style: { text: `Get ${label} Signal`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.DYN.SIGNAL`, value: '' } }], up: [] }],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: 'Inputs',
      name: `Get ${label} Clip`,
      style: { text: `Get ${label} Clip`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: `GET IN-${iid}.DYN.CLIP`, value: '' } }], up: [] }],
      feedbacks: []
    });
  });

  return presets;
};