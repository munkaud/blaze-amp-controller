module.exports = function (instance) {
  const presets = [];
  const zoneMap = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' };

  for (let zid = 1; zid <= instance.state.zones; zid++) {
    const zoneLetter = zoneMap[zid];
    const isSecondary = (zid === 2 && instance.state.zoneLinks[1] === 1) || (zid === 4 && instance.state.zoneLinks[3] === 1);
    if (isSecondary) continue; // Skip secondary zones in stereo pairs

    // Zone Name Preset
    presets.push({
      category: 'Zone Names',
      label: `Zone ${zoneLetter} Name`,
      bank: {
        style: 'text',
        text: `$(blaze-amp-controller:zone_name_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Gain Preset
    presets.push({
      category: 'Zone Gains',
      label: `Zone ${zoneLetter} Gain`,
      bank: {
        style: 'text',
        text: `$(blaze-amp-controller:zone_gain_${zid}) dB`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Mute Preset
    presets.push({
      category: 'Zone Mutes',
      label: `Zone ${zoneLetter} Mute`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Mute: $(blaze-amp-controller:zone_mute_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [
        {
          action: 'setZoneMute',
          options: { zoneId: zoneLetter, value: '1' },
        },
      ],
      feedbacks: [
        {
          type: 'zone_mute',
          options: { zoneId: zid },
          style: {
            bgcolor: 0xFF0000, // Red
            color: 0xFFFFFF, // White
          },
        },
      ],
    });

    // Zone Primary Source Preset
    presets.push({
      category: 'Zone Sources',
      label: `Zone ${zoneLetter} Primary Source`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Primary: $(blaze-amp-controller:zone_primary_src_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Priority Source Preset
    presets.push({
      category: 'Zone Sources',
      label: `Zone ${zoneLetter} Priority Source`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Priority: $(blaze-amp-controller:zone_priority_src_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Mode Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Mode`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Ducker Mode: $(blaze-amp-controller:zone_ducker_mode_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Auto Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Auto`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Ducker Auto: $(blaze-amp-controller:zone_ducker_auto_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Threshold Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Threshold`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Threshold: $(blaze-amp-controller:zone_ducker_threshold_${zid}) dB`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Depth Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Depth`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Depth: $(blaze-amp-controller:zone_ducker_depth_${zid}) dB`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Attack Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Attack`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Attack: $(blaze-amp-controller:zone_ducker_attack_${zid}) s`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Release Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Release`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Release: $(blaze-amp-controller:zone_ducker_release_${zid}) s`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Hold Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Hold`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Hold: $(blaze-amp-controller:zone_ducker_hold_${zid}) s`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Override Gain Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Override Gain`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Override Gain: $(blaze-amp-controller:zone_ducker_override_gain_${zid}) dB`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });

    // Zone Ducker Override Gain Enable Preset
    presets.push({
      category: 'Zone Ducker',
      label: `Zone ${zoneLetter} Ducker Override Gain Enable`,
      bank: {
        style: 'text',
        text: `Zone ${zoneLetter} Override Gain Enable: $(blaze-amp-controller:zone_ducker_override_gain_enable_${zid})`,
        size: '14',
        color: 0xFFFFFF, // White
        bgcolor: 0x000000, // Black
      },
      actions: [],
      feedbacks: [],
    });
  }

  return presets;
};