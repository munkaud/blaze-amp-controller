module.exports = (instance) => {
    const iids = [100, 101, 102, 103, 200, 201, 400]; // Known IIDs for 4-channel
    const presets = [];
    iids.forEach(iid => {
      const defaultName = `Input ${iid}`;
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Mute ${defaultName}`,
        style: { text: `Mute ${instance.state.inputNames[iid] || defaultName}`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { actionId: 'muteInput', options: { inputId: iid, mute: true } },
              { actionId: 'getInputName', options: { iid: iid } }, // Fetch name on press
            ],
            up: [],
          },
        ],
        feedbacks: [
          { feedbackId: 'inputMuteState', options: { inputId: iid } },
        ],
      });
      presets.push({
        type: 'button',
        category: 'Inputs',
        name: `Level ${defaultName}`,
        style: { text: `${instance.state.inputNames[iid] || defaultName} Level`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { actionId: 'setInputGain', options: { inputId: iid, gain: 0 } },
              { actionId: 'getInputName', options: { iid: iid } },
            ],
            up: [],
          },
        ],
      });
    });
    return presets;
  };