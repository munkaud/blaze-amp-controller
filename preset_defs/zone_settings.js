const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = ['A', 'B', 'C'];

  zones.forEach(zone => {
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Get Zone ${zone} Name`,
      style: { text: `Get Zone ${zone} Name`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `GET ZONE-${zone}.NAME`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Name`,
      style: { text: `Set Zone ${zone} Name`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.NAME Zone${zone}`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Gain`,
      style: { text: `Set Gain ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.GAIN 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Increment Zone ${zone} Gain`,
      style: { text: `Inc Gain ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `INC ZONE-${zone}.GAIN 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Mute`,
      style: { text: `Mute ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.MUTE 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Primary Source`,
      style: { text: `Primary Src ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.PRIMARY_SRC 100`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Priority Source`,
      style: { text: `Priority Src ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.PRIORITY_SRC 200`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Get Zone ${zone} Count`,
      style: { text: `Get Zone Count`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `GET ZONE.COUNT`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Gain Min`,
      style: { text: `Gain Min ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.GAIN_MIN -60`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Gain Max`,
      style: { text: `Gain Max ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.GAIN_MAX 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} Stereo`,
      style: { text: `Stereo ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.STEREO 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Set Zone ${zone} GPIO VC`,
      style: { text: `GPIO VC ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.GPIO_VC 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Enable Zone ${zone} Mute`,
      style: { text: `Mute Enable ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.MUTE_ENABLE 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Enable Zone ${zone} Source 100`,
      style: { text: `Src 100 En ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ZONE-${zone}.SRC-100.ENABLED 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zone}`,
      name: `Get Zone ${zone} Signal`,
      style: { text: `Get Signal ${zone}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `GET ZONE-${zone}.DYN.SIGNAL`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
  });

  return presets;
};