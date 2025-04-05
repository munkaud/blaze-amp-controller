module.exports = (instance) => {
    const presets = [];
    const zoneCount = instance.state.zones || 4;
  
    for (let zid = 1; zid <= zoneCount; zid++) {
      const zoneName = instance.state.zoneNames?.[zid] || `Zone ${zid}`; // Generic
  
      // Stereo/Mono Toggle
      presets.push({
        type: 'button',
        category: 'Zones',
        name: `Stereo ${zoneName}`,
        style: { text: `${zoneName} Stereo`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { actionId: 'linkZone', options: { zoneId: zid, stereo: !instance.state.zoneLinks[zid] } },
              { actionId: 'getZoneConfig', options: { zoneId: zid } },
            ],
            up: [],
          },
        ],
        feedback: [
          { feedbackId: 'zoneStatus', options: { zoneId: zid } },
        ],
      });
  
      // Input Assign
      presets.push({
        type: 'button',
        category: 'Zones',
        name: `Input ${zoneName}`,
        style: { text: `${zoneName} Input`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { actionId: 'setZoneInput', options: { zoneId: zid, inputId: instance.state.zoneInputs?.[zid] || 100 } },
              { actionId: 'getZoneConfig', options: { zoneId: zid } },
            ],
            up: [],
          },
        ],
        feedback: [
          { feedbackId: 'zoneStatus', options: { zoneId: zid } },
        ],
      });
  
      // Gain Slider
      presets.push({
        type: 'button',
        category: 'Zones',
        name: `Gain ${zoneName}`,
        style: { text: `${zoneName} Gain`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { 
                actionId: 'setZoneGain', 
                options: { 
                  zoneId: zid, 
                  gain: instance.state.zoneGains?.[zid] || 0 
                } 
              },
              { actionId: 'getZoneConfig', options: { zoneId: zid } },
            ],
            up: [],
          },
        ],
        feedback: [
          { feedbackId: 'zoneStatus', options: { zoneId: zid } },
        ],
      });
  
      // Name Set
      presets.push({
        type: 'button',
        category: 'Zones',
        name: `Name ${zoneName}`,
        style: { text: `${zoneName} Name`, size: '14', color: '16777215', bgcolor: '0' },
        steps: [
          {
            down: [
              { actionId: 'setZoneName', options: { zoneId: zid, name: instance.state.zoneNames?.[zid] || `Zone ${zid}` } },
              { actionId: 'getZoneConfig', options: { zoneId: zid } },
            ],
            up: [],
          },
        ],
        feedback: [
          { feedbackId: 'zoneStatus', options: { zoneId: zid } },
        ],
      });
    }
  
    return presets;
  };