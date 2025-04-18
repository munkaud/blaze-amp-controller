const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = ['A', 'B', 'C'];

  zones.forEach(zone => {
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Enable Zone ${zone} Ducker Auto`,
      style: { text: `Duck Auto ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.AUTO 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Set Zone ${zone} Ducker Threshold`,
      style: { text: `Duck Thresh ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.THRESHOLD -20`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Set Zone ${zone} Ducker Depth`,
      style: { text: `Duck Depth ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.DEPTH -10`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Set Zone ${zone} Ducker Attack`,
      style: { text: `Duck Attack ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.ATTACK 0.1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Set Zone ${zone} Ducker Release`,
      style: { text: `Duck Release ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.RELEASE 1.0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Set Zone ${zone} Ducker Hold`,
      style: { text: `Duck Hold ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.HOLD 0.5`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Set Zone ${zone} Ducker Override Gain`,
      style: { text: `Duck Override ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.OVERRIDE_GAIN -5`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Ducking`,
      name: `Enable Zone ${zone} Ducker Override Gain`,
      style: { text: `Duck Override En ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.DUCK.OVERRIDE_GAIN_ENABLE 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
  });

  return presets;
};