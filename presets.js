const { combineRgb } = require('@companion-module/base');

const powerPresets = require('./preset_defs/power');
const setupPresets = require('./preset_defs/setup');
const inputPresets = require('./preset_defs/inputs');
const digitalPresets = require('./preset_defs/digitals');
const zonePresets = require('./preset_defs/zones');
const outputPresets = require('./preset_defs/outputs');
const registersPresets = require('./preset_defs/registers');

function initPresets(instance) {
  instance.log('debug', 'Starting preset generation');
  const presets = [];

  const getPresets = (presetExport, category) => {
    try {
      if (typeof presetExport === 'function') {
        const result = presetExport(instance);
        return Array.isArray(result) ? result : [];
      }
      return Array.isArray(presetExport) ? presetExport : [];
    } catch (err) {
      instance.log('error', `Failed to load presets for category ${category}: ${err.message}`);
      return [];
    }
  };

  presets.push(...getPresets(powerPresets, 'Power'));
  presets.push(...getPresets(setupPresets, 'Setup'));
  presets.push(...getPresets(inputPresets, 'Inputs'));
  presets.push(...getPresets(digitalPresets, 'Digitals'));
  presets.push(...getPresets(zonePresets, 'Zones'));
  presets.push(...getPresets(outputPresets, 'Outputs'));
  presets.push(...getPresets(registersPresets, 'Registers'));

  instance.log('debug', `Zones in state: ${instance.state.zones}`);
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
          feedbackId: 'zoneMute',
          options: { zone: zoneLetter },
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
            feedbackId: 'zoneSource',
            options: { zone: zoneLetter, source: src },
          },
        ],
      });
    }
  }

  instance.log('debug', `Generated ${presets.length} presets`);
  instance.setPresetDefinitions(presets);
  return presets; // Ensure a return value for safety
}

function updatePresetsDebounced(instance) {
  instance.log('debug', `updatePresetsDebounced called with pendingUpdates: ${instance.pendingUpdates}`);
  if (instance.presetUpdateDebounce) {
    instance.log('debug', 'Clearing existing debounce timer');
    clearTimeout(instance.presetUpdateDebounce);
  }

  const delay = instance.pendingUpdates >= 20 ? 15000 : 5000;
  instance.log('debug', `Setting debounce timer with delay: ${delay}ms`);

  instance.presetUpdateDebounce = setTimeout(() => {
    instance.log('info', 'Updating presets after debounce');
    initPresets(instance);
    instance.pendingUpdates = 0;
    instance.log('debug', 'Reset pendingUpdates to 0');
  }, delay);
}

module.exports = { initPresets, updatePresetsDebounced };