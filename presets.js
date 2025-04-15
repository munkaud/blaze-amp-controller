const { combineRgb } = require('@companion-module/base');

const powerPresets = require('./preset_defs/power');
const setupPresets = require('./preset_defs/setup');
const inputPresets = require('./preset_defs/inputs');
const digitalPresets = require('./preset_defs/digitals');
const zonePresets = require('./preset_defs/zones');
const outputPresets = require('./preset_defs/outputs');
const registersPresets = require('./preset_defs/registers');

function initPresets(instance) {
  const presets = [];

  const getPresets = (presetExport) => {
    if (typeof presetExport === 'function') {
      return presetExport(instance);
    }
    return presetExport || [];
  };

  presets.push(...getPresets(powerPresets));
  presets.push(...getPresets(setupPresets));
  presets.push(...getPresets(inputPresets));
  presets.push(...getPresets(digitalPresets));
  presets.push(...getPresets(zonePresets));
  presets.push(...getPresets(outputPresets));
  presets.push(...getPresets(registersPresets));

  for (let zid = 1; zid <= 4; zid++) {
    const zoneLetter = String.fromCharCode(64 + zid);
    const zoneName = instance.state.zoneNames[zid] || `Zone ${zoneLetter}`;

    presets.push({
      category: `Zone ${zoneLetter}`,
      label: `${zoneName} Mute`,
      bank: {
        style: 'text',
        text: `${zoneName}\\nMute`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      actions: [
        {
          action: 'toggleZoneMute',
          options: { zone: zoneLetter },
        },
      ],
      feedbacks: [
        {
          type: 'zoneMute',
          options: { zone: zoneLetter },
          style: {
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    });

    const sources = [100, 102, 200, 400];
    for (const src of sources) {
      const srcName = instance.state.inputNames[src] || `Input ${src}`;
      presets.push({
        category: `Zone ${zoneLetter}`,
        label: `${zoneName} Src ${srcName}`,
        bank: {
          style: 'text',
          text: `${zoneName}\\n${srcName}`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        actions: [
          {
            action: 'setZoneSource',
            options: { zone: zoneLetter, source: src },
          },
        ],
        feedbacks: [
          {
            type: 'zoneSource',
            options: { zone: zoneLetter, source: src },
            style: {
              bgcolor: combineRgb(0, 0, 255),
            },
          },
        ],
      });
    }
  }

  instance.setPresetDefinitions(presets);
}

function updatePresetsDebounced(instance) {
  if (instance.presetUpdateDebounce) {
    clearTimeout(instance.presetUpdateDebounce);
  }

  // Increase initial delay to 10 seconds to ensure all polling responses are received
  const delay = instance.pendingUpdates >= 20 ? 10000 : 2000; // 10 seconds for initial update, 2 seconds for subsequent updates

  instance.presetUpdateDebounce = setTimeout(() => {
    instance.log('info', 'Updating presets after debounce');
    initPresets(instance);
    instance.pendingUpdates = 0;
  }, delay);
}

module.exports = { initPresets, updatePresetsDebounced };