module.exports = (instance) => {
    const iids = [100, 101, 102, 103];
    const presets = [];
    iids.forEach(iid => {
      const defaultName = `Input ${iid}`;
      const name = instance.state.inputNames[iid] || defaultName;
      const isSecondary = iid === 101 && instance.state.stereoPairs[100] === true ||
                          iid === 103 && instance.state.stereoPairs[102] === true;
      if (!isSecondary) {
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
        presets.push({
          type: 'button',
          category: 'Analog Inputs',
          name: `Sensitivity ${name}`,
          style: { text: `${name} Sens`, size: '14', color: '16777215', bgcolor: '0' },
          steps: [
            {
              down: [
                { actionId: 'setInputSensitivity', options: { inputId: iid, sensitivity: instance.state.inputSensitivities[iid] || '14DBU' } },
                { actionId: 'getInputSensitivity', options: { inputId: iid } },
              ],
              up: [],
            },
          ],
          feedback: [
            { feedbackId: 'inputSensitivity', options: { inputId: iid } },
          ],
        });
      }
    });
    return presets;
  };