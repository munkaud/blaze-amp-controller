const { combineRgb } = require('@companion-module/base');

function initFeedbacks(instance) {
  const feedbacks = {
    powerState: {
      type: 'boolean',
      name: 'Power State',
      description: 'Change style based on power state',
      options: [
        {
          type: 'dropdown',
          label: 'State',
          id: 'state',
          default: 'ON',
          choices: [
            { id: 'ON', label: 'On' },
            { id: 'OFF', label: 'Off' },
          ],
        },
      ],
      defaultStyle: {
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 255, 0),
      },
      callback: (feedback) => {
        return instance.state.power === feedback.options.state;
      },
    },
    zoneMute: {
      type: 'boolean',
      name: 'Zone Mute State',
      description: 'Change style based on zone mute state',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zone',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
      ],
      defaultStyle: {
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(255, 0, 0),
      },
      callback: (feedback) => {
        const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[feedback.options.zone];
        return instance.state.zoneMutes[zid] === true;
      },
    },
    zoneSource: {
      type: 'boolean',
      name: 'Zone Source Selection',
      description: 'Change style based on zone primary source',
      options: [
        {
          type: 'dropdown',
          label: 'Zone',
          id: 'zone',
          default: 'A',
          choices: [
            { id: 'A', label: 'Zone A' },
            { id: 'B', label: 'Zone B' },
            { id: 'C', label: 'Zone C' },
            { id: 'D', label: 'Zone D' },
          ],
        },
        {
          type: 'number',
          label: 'Source Input ID (e.g., 100, 102, 200, 400)',
          id: 'source',
          default: 100,
          min: 100,
          max: 400,
        },
      ],
      defaultStyle: {
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 255),
      },
      callback: (feedback) => {
        const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[feedback.options.zone];
        return instance.state.zonePrimarySrc[zid] === parseInt(feedback.options.source);
      },
    },
  };
  instance.setFeedbackDefinitions(feedbacks);
}

module.exports = { initFeedbacks };