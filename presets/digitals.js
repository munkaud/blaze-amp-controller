module.exports = (instance) => {
    const presets = [];
    const spdif1Name = instance.state.inputNames[200] || 'S/PDIF 1';
    const spdif2Name = instance.state.inputNames[201] || 'S/PDIF 2';
    const isSpdifStereo = instance.state.stereoPairs[200] === true;
  
    if (isSpdifStereo || instance.state.stereoPairs[200] === undefined) {
      presets.push({
        type: 'button',
        category: 'Digital Inputs',
        name: `Trim ${spdif1Name} (Stereo)`,
        style: { 
          text: `${spdif1Name} Trim (Stereo)`, 
          size: '14', 
          color: '16777215', 
          bgcolor: '0' 
        },
        steps: [
          {
            down: [
              { actionId: 'setInputGain', options: { inputId: 200, gain: instance.state.inputGains[200] || 0 } },
              { actionId: 'getInputTrim', options: { inputId: 200 } },
            ],
            up: [],
          },
        ],
      });
    } else {
      [200, 201].forEach(iid => {
        const name = iid === 200 ? spdif1Name : spdif2Name;
        presets.push({
          type: 'button',
          category: 'Digital Inputs',
          name: `Trim ${name}`,
          style: { 
            text: `${name} Trim`, 
            size: '14', 
            color: '16777215', 
            bgcolor: '0' 
          },
          steps: [
            {
              down: [
                { actionId: 'setInputGain', options: { inputId: iid, gain: instance.state.inputGains[iid] || 0 } },
                { actionId: 'getInputTrim', options: { inputId: iid } },
              ],
              up: [],
            },
          ],
        });
      });
    }
  
    const generatorName = instance.state.inputNames[400] || 'Generator';
    presets.push({
      type: 'button',
      category: 'Digital Inputs',
      name: `Generator Gain ${generatorName}`,
      style: { 
        text: `${generatorName} Gain: ${instance.state.generatorGain !== null ? instance.state.generatorGain : 'Unknown'}`, 
        size: '14', 
        color: '16777215', 
        bgcolor: '0' 
      },
      steps: [
        {
          down: [
            { actionId: 'setGeneratorGain', options: { gain: instance.state.generatorGain || 0 } },
            { actionId: 'getGeneratorGain', options: {} },
          ],
          up: [],
        },
      ],
    });
    return presets;
  };