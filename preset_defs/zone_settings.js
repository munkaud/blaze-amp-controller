const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [];
  const zones = self.state.zones || ['ZONE-A', 'ZONE-B', 'ZONE-C', 'ZONE-D', 'ZONE-E', 'ZONE-F', 'ZONE-G', 'ZONE-H'];

  zones.forEach((zone) => {
    if (self.state.zoneLinks[zone] || self.state.zoneStereo[zone]) return;
    
    const zoneLetter = zone.split('-')[1];
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Get Zone ${zoneLetter} Name`,
      style: { text: `Get Zone ${zoneLetter} Name`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `GET ${zone}.NAME`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Name`,
      style: { text: `Set Zone ${zoneLetter} Name`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.NAME Zone${zoneLetter}`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Gain`,
      style: { text: `Set Gain ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.GAIN 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Increment Zone ${zoneLetter} Gain`,
      style: { text: `Inc Gain ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `INC ${zone}.GAIN 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Decrement Zone ${zoneLetter} Gain`,
      style: { text: `Dec Gain ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `INC ${zone}.GAIN -1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Mute`,
      style: { text: `Mute ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.MUTE 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Primary Source`,
      style: { text: `Primary Src ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.PRIMARY_SRC MIC1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Priority Source`,
      style: { text: `Priority Src ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.PRIORITY_SRC LINE1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Get Zone Count`,
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
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Gain Min`,
      style: { text: `Gain Min ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.GAIN_MIN -60`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Gain Max`,
      style: { text: `Gain Max ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.GAIN_MAX 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} Stereo`,
      style: { text: `Stereo ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.STEREO 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Set Zone ${zoneLetter} GPIO VC`,
      style: { text: `GPIO VC ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.GPIO_VC 0`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Enable Zone ${zoneLetter} Mute`,
      style: { text: `Mute Enable ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.MUTE_ENABLE 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Enable Zone ${zoneLetter} Source MIC1`,
      style: { text: `Src MIC1 En ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `SET ${zone}.SRC-MIC1.ENABLED 1`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
    presets.push({
      type: 'button',
      category: `Zone ${zoneLetter}`,
      name: `Get Zone ${zoneLetter} Signal`,
      style: { text: `Get Signal ${zoneLetter}`, size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'sendCommand', options: { command: `GET ${zone}.DYN.SIGNAL`, value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    });
  });

  return presets;
};