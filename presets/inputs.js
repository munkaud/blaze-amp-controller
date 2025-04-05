module.exports = (instance) => {
  const presets = [];
  const primaryIids = [100, 102]; // Ready for 104, 106 later
  const secondaryIids = [101, 103];
  const inputOneName = instance.state.inputNames?.[100] || `Input ${100}`;
  const inputTwoName = instance.state.inputNames?.[102] || `Input ${102}`;
  const is100Stereo = instance.state.stereoPairs[100] === true;
  const is102Stereo = instance.state.stereoPairs[102] === true;

  primaryIids.forEach(iid => {
    const name = iid === 100 ? inputOneName : inputTwoName;
    const isStereo = iid === 100 ? is100Stereo : is102Stereo;
    const isSecondary = iid === 100 ? 101 : 103;
    presets.push({
      type: 'button',
      category: 'Analog Inputs',
      name: `Sens ${name}`,
      style: { text: `${name} Sens`, size: '14', color: '16777215', bgcolor: '0' },
      steps: [
        {
          down: [
            { actionId: 'setInputSensitivity', options: { inputId: iid, sensitivity: instance.state.inputSensitivities[iid] || '4DBU' } },
            { actionId: 'getInputSensitivity', options: { inputId: iid } },
          ],
          up: [],
        },
      ],
      feedback: [
        { feedbackId: 'inputSensitivity', options: { inputId: iid } },
      ],
    });
    presets.push({
      type: 'button',
      category: 'Analog Inputs',
      name: `Trim ${name}`,
      style: { text: `${name} Trim`, size: '14', color: '16777215', bgcolor: '0' },
      steps: [
        {
          down: [
            { actionId: 'setInputGain', options: { inputId: iid, gain: instance.state.inputGains[iid] || 0 } },
            { actionId: 'getInputTrim', options: { inputId: iid } },
          ],
          up: [],
        },
      ],
      feedback: [
        { feedbackId: 'inputTrim', options: { inputId: iid } },
      ],
    });
    if (!isStereo) {
      presets.push({
        type: 'button',
        category: 'Analog Inputs',
        name: `Sens ${iid === 100 ? 'Analog 2' : 'Analog 4'}`,
        style: { text: `${iid === 100 ? 'Analog 2' : 'Analog 4'} Sens`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { actionId: 'setInputSensitivity', options: { inputId: isSecondary, sensitivity: instance.state.inputSensitivities[isSecondary] || '4DBU' } },
              { actionId: 'getInputSensitivity', options: { inputId: isSecondary } },
            ],
            up: [],
          },
        ],
        feedback: [
          { feedbackId: 'inputSensitivity', options: { inputId: isSecondary } },
        ],
      });
      presets.push({
        type: 'button',
        category: 'Analog Inputs',
        name: `Trim ${iid === 100 ? 'Analog 2' : 'Analog 4'}`,
        style: { text: `${iid === 100 ? 'Analog 2' : 'Analog 4'} Trim`, size: '14', color: '16777215', bgcolor: '0' },
      steps: [
        {
          down: [
            { actionId: 'setInputGain', options: { inputId: isSecondary, gain: instance.state.inputGains[isSecondary] || 0 } },
            { actionId: 'getInputTrim', options: { inputId: isSecondary } },
          ],
          up: [],
        },
      ],
      feedback: [
        { feedbackId: 'inputTrim', options: { inputId: isSecondary } },
      ],
    });
    }
  });

  return presets;
};