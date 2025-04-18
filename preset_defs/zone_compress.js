const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = ['A', 'B', 'C'];

  zones.forEach(zone => {
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Enable Zone ${zone} Compressor Auto`,
      style: { text: `Comp Auto ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.AUTO 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Threshold`,
      style: { text: `Comp Thresh ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.THRESHOLD -30`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Attack`,
      style: { text: `Comp Attack ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.ATTACK 0.1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Release`,
      style: { text: `Comp Release ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.RELEASE 1.0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Ratio`,
      style: { text: `Comp Ratio ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.RATIO 2.0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Hold`,
      style: { text: `Comp Hold ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.HOLD 0.5`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Knee`,
      style: { text: `Comp Knee ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.KNEE 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone} Compression`,
      name: `Set Zone ${zone} Compressor Bypass`,
      style: { text: `Comp Bypass ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.COMPRESSOR.BYPASS 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
  });

  return presets;
};