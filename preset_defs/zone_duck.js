const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];

  zones.forEach((zone) => {
    // Skip if zone is a secondary link (e.g., ZONE-B linked to ZONE-A)
    if (self.state.zoneLinks[zone]) return;

    const zoneLetter = zone.split('-')[1];
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Enable Zone ${zoneLetter} Ducker Auto`,
      style: { text: `Duck Auto ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.AUTO 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Disable Zone ${zoneLetter} Ducker Auto`,
      style: { text: `Duck Auto OFF ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.AUTO 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Priority`,
      style: { text: `Duck Priority ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.PRIORITY MIC1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Threshold`,
      style: { text: `Duck Thresh ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.THRESHOLD -20`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Depth`,
      style: { text: `Duck Depth ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.DEPTH -10`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Attack`,
      style: { text: `Duck Attack ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.ATTACK 0.1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Release`,
      style: { text: `Duck Release ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.RELEASE 1.0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Hold`,
      style: { text: `Duck Hold ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.HOLD 0.5`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Set Zone ${zoneLetter} Ducker Override Gain`,
      style: { text: `Duck Override ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.OVERRIDE_GAIN -5`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Enable Zone ${zoneLetter} Ducker Override Gain`,
      style: { text: `Duck Override En ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.DUCK.OVERRIDE_GAIN_ENABLE 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter} Ducking`,
      name: `Get Zone ${zoneLetter} Ducker Settings`,
      style: { text: `Get Duck ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.AUTO`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.PRIORITY`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.THRESHOLD`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.DEPTH`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.ATTACK`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.RELEASE`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.HOLD`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.OVERRIDE_GAIN`, value: '' } },
            { actionId: 'sendCommand', options: { command: `GET ${zone}.DUCK.OVERRIDE_GAIN_ENABLE`, value: '' } },
          ],
          up: []
        }
      ],
      feedbacks: []
    });
  });

  return presets;
};