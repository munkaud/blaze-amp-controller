const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone]) return; // Skip secondary zones

    const zoneLetter = zone.split('-')[1];

    // Zone Name Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Settings`,
      name: `Zone ${zoneLetter} Name`,
      style: {
        text: `Zone ${zoneLetter} Name`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.NAME`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Gain Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Settings`,
      name: `Zone ${zoneLetter} Gain`,
      style: {
        text: `Zone ${zoneLetter} Gain`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.GAIN`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Mute Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Settings`,
      name: `Zone ${zoneLetter} Mute`,
      style: {
        text: `Zone ${zoneLetter} Mute`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `SET ${zone}.MUTE 1`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'zone_mute',
          options: { zoneId: zone },
          style: {
            bgcolor: combineRgb(255, 0, 0),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    });

    // Zone Primary Source Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Settings`,
      name: `Zone ${zoneLetter} Primary Source`,
      style: {
        text: `Zone ${zoneLetter} Primary Source`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.PRIMARY_SRC`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Priority Source Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Settings`,
      name: `Zone ${zoneLetter} Priority Source`,
      style: {
        text: `Zone ${zoneLetter} Priority Source`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.PRIORITY_SRC`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Mode Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Mode`,
      style: {
        text: `Zone ${zoneLetter} Ducker Mode`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.MODE`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Auto Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Auto`,
      style: {
        text: `Zone ${zoneLetter} Ducker Auto`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.AUTO`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Threshold Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Threshold`,
      style: {
        text: `Zone ${zoneLetter} Ducker Threshold`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.THRESHOLD`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Depth Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Depth`,
      style: {
        text: `Zone ${zoneLetter} Ducker Depth`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.DEPTH`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Attack Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Attack`,
      style: {
        text: `Zone ${zoneLetter} Ducker Attack`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.ATTACK`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Release Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Release`,
      style: {
        text: `Zone ${zoneLetter} Ducker Release`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.RELEASE`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Hold Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Hold`,
      style: {
        text: `Zone ${zoneLetter} Ducker Hold`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.HOLD`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Override Gain Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Override Gain`,
      style: {
        text: `Zone ${zoneLetter} Ducker Override Gain`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.OVERRIDE_GAIN`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });

    // Zone Ducker Override Gain Enable Preset
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducker`,
      name: `Zone ${zoneLetter} Ducker Override Gain Enable`,
      style: {
        text: `Zone ${zoneLetter} Ducker Override Gain Enable`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'sendCommand',
              options: { command: `GET ${zone}.DUCKER.OVERRIDE_GAIN_ENABLE`, value: '' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    });
  });

  return presets;
};