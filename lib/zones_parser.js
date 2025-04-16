module.exports = function (instance, message) {
  let stateChanged = false;

  // Split multi-line messages and process each line individually
  const messages = message.split('\n').filter(msg => msg.trim() !== '');

  for (const msg of messages) {
    // Skip echoed commands (e.g., *GET, *SET)
    if (msg.startsWith('*GET') || msg.startsWith('*SET') || msg.startsWith('*SUBSCRIBE') || msg.startsWith('*UNSUBSCRIBE')) {
      continue;
    }

    // Match Zone ID (A, B, C, D, etc.) and handle zone-related messages
    const zoneMatch = msg.match(/\+ZONE-([A-Z])\.(.+)/);
    if (zoneMatch) {
      const zoneLetter = zoneMatch[1];
      const zid = zoneLetter.charCodeAt(0) - 64; // A=1, B=2, etc.
      const rest = zoneMatch[2];

      // Zone Name
      if (rest.startsWith('NAME')) {
        const nameMatch = rest.match(/NAME\s+"([^"]+)"/);
        if (nameMatch) {
          instance.state.zoneNames[zid] = nameMatch[1];
          instance.log('info', `Zone ${zoneLetter} name set to "${nameMatch[1]}"`);
          stateChanged = true;
        }
      }

      // Zone Gain
      else if (rest.startsWith('GAIN')) {
        const gainMatch = rest.match(/GAIN\s+(-?\d+\.\d+)/);
        if (gainMatch) {
          instance.state.zoneGains[zid] = parseFloat(gainMatch[1]);
          instance.log('info', `Zone ${zoneLetter} gain set to ${instance.state.zoneGains[zid]} dB`);
          stateChanged = true;
        }
      }

      // Zone Gain Range
      else if (rest.startsWith('GAIN_RANGE')) {
        const rangeMatch = rest.match(/GAIN_RANGE\s+(-?\d+\.\d+)\s+(-?\d+\.\d+)/);
        if (rangeMatch) {
          instance.state.zoneGainRanges[zid] = {
            min: parseFloat(rangeMatch[1]),
            max: parseFloat(rangeMatch[2]),
          };
          instance.log('info', `Zone ${zoneLetter} gain range set to ${rangeMatch[1]} to ${rangeMatch[2]} dB`);
          stateChanged = true;
        }
      }

      // Zone Link
      else if (rest.startsWith('LINK')) {
        const linkMatch = rest.match(/LINK\s+"([^"]+)"/);
        if (linkMatch) {
          instance.state.zoneLinks[zid] = linkMatch[1];
          instance.log('info', `Zone ${zoneLetter} link set to "${linkMatch[1]}"`);
          stateChanged = true;
        }
      }

      // Zone Primary Source
      else if (rest.startsWith('PRIMARY_SRC')) {
        const srcMatch = rest.match(/PRIMARY_SRC\s+(\d+)/);
        if (srcMatch) {
          instance.state.zonePrimarySrc[zid] = parseInt(srcMatch[1]);
          instance.log('info', `Zone ${zoneLetter} primary source set to ${instance.state.zonePrimarySrc[zid]}`);
          stateChanged = true;
        }
      }

      // Zone Priority Source
      else if (rest.startsWith('PRIORITY_SRC')) {
        const srcMatch = rest.match(/PRIORITY_SRC\s+(\d+)/);
        if (srcMatch) {
          instance.state.zonePrioritySrc[zid] = parseInt(srcMatch[1]);
          instance.log('info', `Zone ${zoneLetter} priority source set to ${instance.state.zonePrioritySrc[zid]}`);
          stateChanged = true;
        }
      }

      // Zone GPIO Volume Control
      else if (rest.startsWith('GPIO_VC')) {
        const gpioMatch = rest.match(/GPIO_VC\s+(\d+)/);
        if (gpioMatch) {
          instance.state.zoneGpioVc[zid] = parseInt(gpioMatch[1]);
          instance.log('info', `Zone ${zoneLetter} GPIO VC set to ${instance.state.zoneGpioVc[zid]}`);
          stateChanged = true;
        }
      }

      // Zone Mute
      else if (rest.startsWith('MUTE')) {
        const muteMatch = rest.match(/MUTE\s+(\d+)/);
        if (muteMatch) {
          instance.state.zoneMutes[zid] = parseInt(muteMatch[1]) === 1;
          instance.log('info', `Zone ${zoneLetter} mute set to ${instance.state.zoneMutes[zid] ? 'Muted' : 'Unmuted'}`);
          stateChanged = true;
        }
      }

      // Zone Mute Enable
      else if (rest.startsWith('MUTE_ENABLE')) {
        const muteEnableMatch = rest.match(/MUTE_ENABLE\s+(\d+)/);
        if (muteEnableMatch) {
          instance.state.zoneMuteEnables[zid] = parseInt(muteEnableMatch[1]) === 1;
          instance.log('info', `Zone ${zoneLetter} mute enable set to ${instance.state.zoneMuteEnables[zid]}`);
          stateChanged = true;
        }
      }

      // Zone Source Enabled
      else if (rest.startsWith('SRC_ENABLED')) {
        const srcEnabledMatch = rest.match(/SRC_ENABLED\s+(\d+)\s+(\d+)/);
        if (srcEnabledMatch) {
          const srcId = parseInt(srcEnabledMatch[1]);
          instance.state.zoneSrcEnabled[zid] = instance.state.zoneSrcEnabled[zid] || {};
          instance.state.zoneSrcEnabled[zid][srcId] = parseInt(srcEnabledMatch[2]) === 1;
          instance.log('info', `Zone ${zoneLetter} source ${srcId} enabled set to ${instance.state.zoneSrcEnabled[zid][srcId]}`);
          stateChanged = true;
        }
      }

      // Zone Ducker Mode
      else if (rest.startsWith('DUCK.MODE')) {
        const modeMatch = rest.match(/DUCK\.MODE\s+"([^"]+)"/);
        if (modeMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].mode = modeMatch[1];
          instance.log('info', `Zone ${zoneLetter} ducker mode set to ${instance.state.zoneDucker[zid].mode}`);
          stateChanged = true;
        }
      }

      // Zone Ducker Auto
      else if (rest.startsWith('DUCK.AUTO')) {
        const autoMatch = rest.match(/DUCK\.AUTO\s+(\d+)/);
        if (autoMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].auto = parseInt(autoMatch[1]) === 1;
          instance.log('info', `Zone ${zoneLetter} ducker auto set to ${instance.state.zoneDucker[zid].auto}`);
          stateChanged = true;
        }
      }

      // Zone Ducker Threshold
      else if (rest.startsWith('DUCK.THRESHOLD')) {
        const thresholdMatch = rest.match(/DUCK\.THRESHOLD\s+(-?\d+\.\d+)/);
        if (thresholdMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].threshold = parseFloat(thresholdMatch[1]);
          instance.log('info', `Zone ${zoneLetter} ducker threshold set to ${instance.state.zoneDucker[zid].threshold} dB`);
          stateChanged = true;
        }
      }

      // Zone Ducker Depth
      else if (rest.startsWith('DUCK.DEPTH')) {
        const depthMatch = rest.match(/DUCK\.DEPTH\s+(-?\d+\.\d+)/);
        if (depthMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].depth = parseFloat(depthMatch[1]);
          instance.log('info', `Zone ${zoneLetter} ducker depth set to ${instance.state.zoneDucker[zid].depth} dB`);
          stateChanged = true;
        }
      }

      // Zone Ducker Attack
      else if (rest.startsWith('DUCK.ATTACK')) {
        const attackMatch = rest.match(/DUCK\.ATTACK\s+(\d+\.\d+)/);
        if (attackMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].attack = parseFloat(attackMatch[1]);
          instance.log('info', `Zone ${zoneLetter} ducker attack set to ${instance.state.zoneDucker[zid].attack} seconds`);
          stateChanged = true;
        }
      }

      // Zone Ducker Release
      else if (rest.startsWith('DUCK.RELEASE')) {
        const releaseMatch = rest.match(/DUCK\.RELEASE\s+(\d+\.\d+)/);
        if (releaseMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].release = parseFloat(releaseMatch[1]);
          instance.log('info', `Zone ${zoneLetter} ducker release set to ${instance.state.zoneDucker[zid].release} seconds`);
          stateChanged = true;
        }
      }

      // Zone Ducker Hold
      else if (rest.startsWith('DUCK.HOLD')) {
        const holdMatch = rest.match(/DUCK\.HOLD\s+(\d+\.\d+)/);
        if (holdMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].hold = parseFloat(holdMatch[1]);
          instance.log('info', `Zone ${zoneLetter} ducker hold set to ${instance.state.zoneDucker[zid].hold} seconds`);
          stateChanged = true;
        }
      }

      // Zone Ducker Override Gain
      else if (rest.startsWith('DUCK.OVERRIDE_GAIN')) {
        const overrideGainMatch = rest.match(/DUCK\.OVERRIDE_GAIN\s+(-?\d+\.\d+)/);
        if (overrideGainMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].overrideGain = parseFloat(overrideGainMatch[1]);
          instance.log('info', `Zone ${zoneLetter} ducker override gain set to ${instance.state.zoneDucker[zid].overrideGain} dB`);
          stateChanged = true;
        }
      }

      // Zone Ducker Override Gain Enable
      else if (rest.startsWith('DUCK.OVERRIDE_GAIN_ENABLE')) {
        const overrideGainEnableMatch = rest.match(/DUCK\.OVERRIDE_GAIN_ENABLE\s+(\d+)/);
        if (overrideGainEnableMatch) {
          instance.state.zoneDucker[zid] = instance.state.zoneDucker[zid] || {};
          instance.state.zoneDucker[zid].overrideGainEnable = parseInt(overrideGainEnableMatch[1]) === 1;
          instance.log('info', `Zone ${zoneLetter} ducker override gain enable set to ${instance.state.zoneDucker[zid].overrideGainEnable}`);
          stateChanged = true;
        }
      }

      // Zone Dynamics Signal
      else if (rest.startsWith('DYN.SIGNAL')) {
        const signalMatch = rest.match(/DYN\.SIGNAL\s+(-?\d+\.\d+)/);
        if (signalMatch) {
          instance.state.zoneDynSignals[zid] = parseFloat(signalMatch[1]);
          instance.log('info', `Zone ${zoneLetter} dynamic signal level set to ${instance.state.zoneDynSignals[zid]} dB`);
          stateChanged = true;
        }
      }

      else {
        instance.log('warn', `Unhandled zone response: ${msg}`);
      }
    }

    // Zone Count
    const zoneCountMatch = msg.match(/\+ZONE\.COUNT\s+(\d+)/);
    if (zoneCountMatch) {
      instance.state.zones = parseInt(zoneCountMatch[1]);
      instance.log('info', `Zone count set to ${instance.state.zones}`);
      stateChanged = true;
    }
  }

  return stateChanged;
};