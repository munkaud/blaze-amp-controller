function initVariables(instance) {
	const variables = [
	  {
		name: 'Power State',
		variableId: 'power_state',
	  },
	  {
		name: 'Input Count',
		variableId: 'input_count',
	  },
	  {
		name: 'Zone Count',
		variableId: 'zone_count',
	  },
	  {
		name: 'Output Count',
		variableId: 'output_count',
	  },
	  {
		name: 'API Version',
		variableId: 'api_version',
	  },
	];
  
	for (let zid = 1; zid <= 4; zid++) {
	  const zoneLetter = String.fromCharCode(64 + zid);
	  variables.push(
		{
		  name: `Zone ${zoneLetter} Gain`,
		  variableId: `zone_${zoneLetter}_gain`,
		},
		{
		  name: `Zone ${zoneLetter} Mute`,
		  variableId: `zone_${zoneLetter}_mute`,
		},
		{
		  name: `Zone ${zoneLetter} Primary Source`,
		  variableId: `zone_${zoneLetter}_primary_src`,
		}
	  );
	}
  
	const inputIids = [100, 102, 200, 400];
	for (const iid of inputIids) {
	  variables.push({
		name: `Input ${iid} Gain`,
		variableId: `input_${iid}_gain`,
	  });
	}
  
	instance.setVariableDefinitions(variables);
	updateVariables(instance);
  }
  
  function updateVariables(instance) {
	instance.setVariableValues({
	  power_state: instance.state.power,
	  input_count: instance.state.inputs,
	  zone_count: instance.state.zones,
	  output_count: instance.state.outputs,
	  api_version: instance.state.apiVersion,
	});
  
	for (let zid = 1; zid <= 4; zid++) {
	  const zoneLetter = String.fromCharCode(64 + zid);
	  instance.setVariableValues({
		[`zone_${zoneLetter}_gain`]: instance.state.zoneGains[zid] ? instance.state.zoneGains[zid].toFixed(1) : 'N/A',
		[`zone_${zoneLetter}_mute`]: instance.state.zoneMutes[zid] ? 'Muted' : 'Unmuted',
		[`zone_${zoneLetter}_primary_src`]: instance.state.zonePrimarySrc[zid] || 'N/A',
	  });
	}
  
	const inputIids = [100, 102, 200, 400];
	for (const iid of inputIids) {
	  instance.setVariableValues({
		[`input_${iid}_gain`]: instance.state.inputGains[iid] ? instance.state.inputGains[iid].toFixed(1) : 'N/A',
	  });
	}
  }
  
  module.exports = { initVariables, updateVariables };