const { combineRgb } = require('@companion-module/base');

function initPresets(instance, customPresets = {}) {
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

  // Only load debug presets for now
  if (customPresets.debug) {
    presets.push(...getPresets(customPresets.debug, 'Debug'));
  }

  instance.log('debug', `Generated ${presets.length} presets`);
  instance.setPresetDefinitions(presets);
  return presets;
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