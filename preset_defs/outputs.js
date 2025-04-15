module.exports = (instance) => {
  const presets = [];
  instance.log('debug', `zonePrimarySrc before preset generation: ${JSON.stringify(instance.state.zonePrimarySrc)}`);
  for (let outputId = 1; outputId <= 4; outputId++) {
    const zone = instance.state.zonePrimarySrc[String(outputId)]; // Ensure key is a string
    if (!zone) {
      instance.log('warn', `Zone assignment for Output ${outputId} not available; skipping preset`);
      continue;
    }
    presets.push({
      category: 'Outputs',
      label: `Output ${outputId} Zone ${zone}`,
      bank: {
        style: 'text',
        text: `Output ${outputId}\nZone ${zone}`,
        size: '14',
        color: 0xFFFFFF,
        bgcolor: 0x000000,
      },
      actions: [
        {
          action: 'setOutputZone',
          options: { output: outputId, zone: zone },
        },
      ],
    });
  }
  return presets;
};