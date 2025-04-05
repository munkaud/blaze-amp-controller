module.exports = (instance) => {
  const presets = [];
  const outputCount = instance.state.outputs || 4;

  for (let oid = 1; oid <= outputCount; oid++) {
    const outputName = instance.state.outputNames?.[oid] || `Output ${oid}`; // Generic
    presets.push({
      type: 'button',
      category: 'Outputs',
      name: `Source ${outputName}`,
      style: { text: `${outputName} Source`, size: '14', color: '16777215', bgcolor: '0' },
      steps: [
        {
          down: [
            { 
              actionId: 'setZoneOutput', 
              options: { 
                outputId: oid, 
                zoneId: instance.state.zoneOutputs[oid]?.zone || 1, 
                channel: instance.state.zoneOutputs[oid]?.channel || 'LEFT' 
              } 
            },
            { actionId: 'getOutputConfig', options: { outputId: oid } },
          ],
          up: [],
        },
      ],
      feedback: [
        { feedbackId: 'outputStatus', options: { outputId: oid } },
      ],
    });
  }

  return presets;
};