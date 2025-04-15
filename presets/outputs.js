module.exports = function (instance) {
  const presets = [];

  // Output Name Presets
  for (let oid = 1; oid <= instance.state.outputs; oid++) {
    presets.push({
      category: 'Output Names',
      label: `Output ${oid} Name`,
      bank: {
        style: 'text',
        text: `$(blaze-amp-controller:output_name_${oid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Output-to-Zone Assignment Presets
    const zoneId = instance.state.zoneOutputs?.[oid]?.zone;
    if (zoneId !== undefined) {
      presets.push({
        category: 'Output to Zone',
        label: `Output ${oid} Zone`,
        bank: {
          style: 'text',
          text: `Out ${oid}: Zone ${zoneId}`,
          size: '14',
          color: 0xFFFFFF, // White
          bgcolor: 0x000000, // Black
        },
        actions: [],
        feedbacks: [],
      });
    } else {
      instance.log('warn', `Zone assignment for Output ${oid} not available; skipping preset`);
      presets.push({
        category: 'Output to Zone',
        label: `Output ${oid} Zone`,
        bank: {
          style: 'text',
          text: `Out ${oid}: Zone Unknown`,
          size: '14',
          color: 0xFFFFFF, // White
          bgcolor: 0x800000, // Dark Red (instead of 0xFF0000 for better contrast)
        },
        actions: [],
        feedbacks: [],
      });
    }
  }

  return presets;
};