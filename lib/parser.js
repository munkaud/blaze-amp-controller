module.exports = function (instance, message) {
  let stateChanged = false;

  // Power state parsing
  if (message.startsWith('+SYSTEM.STATUS.STATE')) {
    const state = message.split('"')[1];
    const newPowerState = state === 'ON' ? 'ON' : 'OFF';
    if (instance.state.power !== newPowerState) stateChanged = true;
    instance.state.power = newPowerState;
    instance.log('info', `Power state set to ${instance.state.power} (raw: ${state})`);
  } else if (message === '*POWER_ON') {
    if (instance.state.power !== 'ON') stateChanged = true;
    instance.state.power = 'ON';
    instance.log('info', 'Power state set to ON');
  } else if (message === '*POWER_OFF') {
    if (instance.state.power !== 'OFF') stateChanged = true;
    instance.state.power = 'OFF';
    instance.log('info', 'Power state set to OFF');
  } else if (message.includes('#GET SYSTEM.STATUS.STATE|Command Failed')) {
    instance.log('warn', 'GET SYSTEM.STATUS.STATE failed - relying on last known state');
  }

  // System register parsing
  else if (message.startsWith('+API_VERSION')) {
    const value = message.split('"')[1];
    instance.state.apiVersion = value;
    instance.log('info', `API version set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.STATUS.SIGNAL_IN')) {
    const value = message.split('"')[1];
    instance.state.systemSignalIn = value;
    instance.log('info', `System signal in status set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.STATUS.SIGNAL_OUT')) {
    const value = message.split('"')[1];
    instance.state.systemSignalOut = value;
    instance.log('info', `System signal out status set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.STATUS.LAN')) {
    const value = message.split('"')[1];
    instance.state.systemLan = value;
    instance.log('info', `System LAN status set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.STATUS.WIFI')) {
    const value = message.split('"')[1];
    instance.state.systemWifi = value;
    instance.log('info', `System WiFi status set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.SWID')) {
    const value = parseInt(message.split(' ')[1], 10);
    instance.state.systemDeviceSwid = value;
    instance.log('info', `System device SWID set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.HWID')) {
    const value = parseInt(message.split(' ')[1], 10);
    instance.state.systemDeviceHwid = value;
    instance.log('info', `System device HWID set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.VENDOR_NAME')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceVendorName = value;
    instance.log('info', `System device vendor name set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.MODEL_NAME')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceModelName = value;
    instance.log('info', `System device model name set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.SERIAL')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceSerial = value;
    instance.log('info', `System device serial set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.FIRMWARE')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceFirmware = value;
    instance.log('info', `System device firmware set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.FIRMWARE_DATE')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceFirmwareDate = value;
    instance.log('info', `System device firmware date set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.MAC')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceMac = value;
    instance.log('info', `System device MAC address set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SYSTEM.DEVICE.WIFI_MAC')) {
    const value = message.split('"')[1];
    instance.state.systemDeviceWifiMac = value;
    instance.log('info', `System device WiFi MAC address set to ${value}`);
    stateChanged = true;
  } else if (message.includes('#GET SYSTEM.TEMPERATURE|Command Failed')) {
    instance.log('warn', 'GET SYSTEM.TEMPERATURE failed - not supported by device');
  } else if (message.includes('#GET SYSTEM.FAN|Command Failed')) {
    instance.log('warn', 'GET SYSTEM.FAN failed - not supported by device');
  } else if (message.includes('#GET SYSTEM.VERSION|Command Failed')) {
    instance.log('warn', 'GET SYSTEM.VERSION failed - not supported by device');
  }

  // Setup system register parsing
  else if (message.startsWith('+SETUP.SYSTEM.DEVICE_NAME')) {
    const value = message.split('"')[1];
    instance.state.setupSystemDeviceName = value;
    instance.log('info', `Setup system device name set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.VENUE_NAME')) {
    const value = message.split('"')[1];
    instance.state.setupSystemVenueName = value;
    instance.log('info', `Setup system venue name set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.CUSTOMER_NAME')) {
    const value = message.split('"')[1];
    instance.state.setupSystemCustomerName = value;
    instance.log('info', `Setup system customer name set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.ASSET_TAG')) {
    const value = message.split('"')[1];
    instance.state.setupSystemAssetTag = value;
    instance.log('info', `Setup system asset tag set to "${value}"`);
    stateChanged = true;
  } else if (message.includes('#GET SETUP.SYSTEM.ASSET_TAG|Command Failed')) {
    instance.log('warn', 'GET SETUP.SYSTEM.ASSET_TAG failed - not supported by device');
  } else if (message.startsWith('+SETUP.SYSTEM.INSTALLER_NAME')) {
    const value = message.split('"')[1];
    instance.state.setupSystemInstallerName = value;
    instance.log('info', `Setup system installer name set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.CONTACT_INFO')) {
    const value = message.split('"')[1];
    instance.state.setupSystemContactInfo = value;
    instance.log('info', `Setup system contact info set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.INSTALL_DATE')) {
    const value = message.split('"')[1];
    instance.state.setupSystemInstallDate = value;
    instance.log('info', `Setup system install date set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.INSTALL_NOTES')) {
    const value = message.split('"')[1];
    instance.state.setupSystemInstallNotes = value;
    instance.log('info', `Setup system install notes set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.LOCATING')) {
    const value = parseInt(message.split(' ')[1], 10);
    instance.state.setupSystemLocating = value;
    instance.log('info', `Setup system locating set to ${value}`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.CUSTOM1')) {
    const value = message.split('"')[1];
    instance.state.setupSystemCustom1 = value;
    instance.log('info', `Setup system custom1 set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.CUSTOM2')) {
    const value = message.split('"')[1];
    instance.state.setupSystemCustom2 = value;
    instance.log('info', `Setup system custom2 set to "${value}"`);
    stateChanged = true;
  } else if (message.startsWith('+SETUP.SYSTEM.CUSTOM3')) {
    const value = message.split('"')[1];
    instance.state.setupSystemCustom3 = value;
    instance.log('info', `Setup system custom3 set to "${value}"`);
    stateChanged = true;
  }

  // Count parsing
  else if (message.startsWith('+IN.COUNT')) {
    instance.state.inputs = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Input count set to ${instance.state.inputs}`);
    const primaryIids = [100, 102, 200, 400];
    primaryIids.forEach((iid, index) => {
      setTimeout(() => {
        instance.socket.send(`GET IN-${iid}.NAME\n`);
        instance.socket.send(`GET IN-${iid}.GAIN\n`);
        if (iid !== 400) instance.socket.send(`GET IN-${iid}.STEREO\n`);
        if (iid === 100 || iid === 102) instance.socket.send(`GET IN-${iid}.SENS\n`);
        if (iid >= 100 && iid <= 199) {
          instance.socket.send(`GET IN-${iid}.HPF_ENABLE\n`);
          instance.socket.send(`GET IN-${iid}.EQ.BYPASS\n`);
        }
      }, index * 500); // 500ms delay between each IID
    });
  } else if (message.startsWith('+IN.EQ.COUNT')) {
    instance.state.inputEqCount = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Input EQ count set to ${instance.state.inputEqCount}`);
    const analogIids = [100, 101, 102, 103];
    analogIids.forEach((iid, iidIndex) => {
      for (let eid = 1; eid <= instance.state.inputEqCount; eid++) {
        setTimeout(() => {
          instance.socket.send(`GET IN-${iid}.EQ-${eid}.TYPE\n`);
          instance.socket.send(`GET IN-${iid}.EQ-${eid}.GAIN\n`);
          instance.socket.send(`GET IN-${iid}.EQ-${eid}.FREQ\n`);
          instance.socket.send(`GET IN-${iid}.EQ-${eid}.Q\n`);
          instance.socket.send(`GET IN-${iid}.EQ-${eid}.BYPASS\n`);
        }, (iidIndex * instance.state.inputEqCount + (eid - 1)) * 100); // 100ms delay per command
      }
    });
  } else if (message.startsWith('+ZONE.COUNT')) {
    instance.state.zones = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Zone count set to ${instance.state.zones}`);
    const zoneMap = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' };
    // First, request stereo status for primary zones
    for (let zid = 1; zid <= instance.state.zones; zid++) {
      const zoneLetter = zoneMap[zid];
      const isPrimary = zid === 1 || zid === 3;
      if (isPrimary) {
        instance.socket.send(`GET ZONE-${zoneLetter}.STEREO\n`);
      }
    }
    // Delay fetching other zone details until stereo status is known
    setTimeout(() => {
      for (let zid = 1; zid <= instance.state.zones; zid++) {
        const zoneLetter = zoneMap[zid];
        const isPrimary = zid === 1 || zid === 3;
        const isStereo = instance.state.zoneLinks[zid] === 1;
        if (!isStereo || isPrimary) { // Skip secondary zones if part of a stereo pair
          instance.socket.send(`GET ZONE-${zoneLetter}.NAME\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.GAIN\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.GAIN_MIN\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.GAIN_MAX\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.PRIMARY_SRC\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.PRIORITY_SRC\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.GPIO_VC\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.MUTE\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.MUTE_ENABLE\n`);
          for (let sid = 100; sid < 100 + instance.state.inputs; sid++) {
            instance.socket.send(`GET ZONE-${zoneLetter}.SRC-${sid}.ENABLED\n`);
          }
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.MODE\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.AUTO\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.THRESHOLD\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.DEPTH\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.ATTACK\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.RELEASE\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.HOLD\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.OVERRIDE_GAIN\n`);
          instance.socket.send(`GET ZONE-${zoneLetter}.DUCK.OVERRIDE_GAIN_ENABLE\n`);
        } else {
          instance.log('debug', `Skipping GET commands for Zone ${zid} (${zoneLetter}) as it is a secondary zone in a stereo pair`);
        }
      }
    }, 1000); // Wait 1 second to allow STEREO responses to be processed
  } else if (message.startsWith('+OUT.COUNT')) {
    instance.state.outputs = parseInt(message.split(' ')[1], 10);
    instance.log('info', `Output count set to ${instance.state.outputs}`);
    for (let oid = 1; oid <= instance.state.outputs; oid++) {
      instance.socket.send(`GET OUT-${oid}.NAME\n`);
      // Do not send GET OUT-${oid}.ZONE as it is not supported by this device
    }
  } else if (message.match(/\+OUT-\d+\.NAME/)) {
    const [_, oid, value] = message.match(/\+OUT-(\d+)\.NAME "(.*)"/);
    instance.state.outputNames[oid] = value;
    instance.log('info', `Output ${oid} name set to "${value}"`);
    stateChanged = true;
  } else if (message.match(/\+OUT-\d+\.ZONE/)) {
    const [_, oid, value] = message.match(/\+OUT-(\d+)\.ZONE (\d+)/);
    if (!instance.state.zoneOutputs) instance.state.zoneOutputs = {};
    instance.state.zoneOutputs[oid] = { zone: parseInt(value, 10) };
    instance.log('info', `Output ${oid} assigned to zone ${value}`);
    stateChanged = true;
  } else if (message.match(/#GET OUT-\d+\.ZONE\|Command Failed/)) {
    const oid = message.match(/#GET OUT-(\d+)\.ZONE\|Command Failed/)[1];
    instance.log('warn', `GET OUT-${oid}.ZONE failed - not supported by device`);
  }

  // Input detail parsing
  else if (message.match(/\+IN-\d+\.NAME/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.NAME "(.*)"/);
    instance.state.inputNames[iid] = value;
    instance.log('info', `Input ${iid} name set to "${value}"`);
  } else if (message.match(/\+IN-\d+\.GAIN/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.GAIN (-?\d+\.\d+)/);
    instance.state.inputGains[iid] = parseFloat(value);
    instance.log('info', `Input ${iid} gain set to ${value} dB`);
    if (iid === '400') {
      instance.state.generatorGain = parseFloat(value);
      instance.log('info', `Generator gain set to ${value} dB`);
    }
  } else if (message.match(/\+IN-\d+\.STEREO/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.STEREO (\d+)/);
    instance.state.stereoPairs[iid] = parseInt(value, 10) === 1;
    instance.log('info', `Input ${iid} stereo set to ${instance.state.stereoPairs[iid]}`);
  } else if (message.match(/\+IN-\d+\.SENS/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.SENS "(.*)"/);
    instance.state.inputSensitivities[iid] = value;
    instance.log('info', `Input ${iid} sensitivity set to ${value}`);
  } else if (message.match(/\+IN-\d+\.HPF_ENABLE/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.HPF_ENABLE (\d+)/);
    if (!instance.state.inputHpfEnable) instance.state.inputHpfEnable = {};
    instance.state.inputHpfEnable[iid] = parseInt(value, 10) === 1;
    instance.log('info', `Input ${iid} HPF enable set to ${instance.state.inputHpfEnable[iid]}`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.EQ\.BYPASS/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.EQ\.BYPASS (\d+)/);
    instance.state.inputEqBypass[iid] = parseInt(value, 10) === 1;
    instance.log('info', `Input ${iid} EQ bypass set to ${instance.state.inputEqBypass[iid]}`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.EQ-\d+\.TYPE/)) {
    instance.log('debug', `Parsing EQ TYPE message: ${message}`);
    const match = message.match(/\+IN-(\d+)\.EQ-(\d+)\.TYPE "(.*)"/);
    if (!match) {
      instance.log('warn', `Failed to parse EQ TYPE message: ${message}`);
      return;
    }
    const [_, iid, eid, value] = match;
    if (!instance.state.inputEqBands[iid]) instance.state.inputEqBands[iid] = {};
    if (!instance.state.inputEqBands[iid][eid]) instance.state.inputEqBands[iid][eid] = {};
    instance.state.inputEqBands[iid][eid].type = value;
    instance.log('info', `Input ${iid} EQ band ${eid} type set to ${value}`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.EQ-\d+\.GAIN/)) {
    instance.log('debug', `Parsing EQ GAIN message: ${message}`);
    const match = message.match(/\+IN-(\d+)\.EQ-(\d+)\.GAIN (-?\d+\.\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse EQ GAIN message: ${message}`);
      return;
    }
    const [_, iid, eid, value] = match;
    if (!instance.state.inputEqBands[iid]) instance.state.inputEqBands[iid] = {};
    if (!instance.state.inputEqBands[iid][eid]) instance.state.inputEqBands[iid][eid] = {};
    instance.state.inputEqBands[iid][eid].gain = parseFloat(value);
    instance.log('info', `Input ${iid} EQ band ${eid} gain set to ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.EQ-\d+\.FREQ/)) {
    instance.log('debug', `Parsing EQ FREQ message: ${message}`);
    const match = message.match(/\+IN-(\d+)\.EQ-(\d+)\.FREQ (-?\d+\.\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse EQ FREQ message: ${message}`);
      return;
    }
    const [_, iid, eid, value] = match;
    if (!instance.state.inputEqBands[iid]) instance.state.inputEqBands[iid] = {};
    if (!instance.state.inputEqBands[iid][eid]) instance.state.inputEqBands[iid][eid] = {};
    instance.state.inputEqBands[iid][eid].freq = parseFloat(value);
    instance.log('info', `Input ${iid} EQ band ${eid} frequency set to ${value} Hz`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.EQ-\d+\.Q/)) {
    instance.log('debug', `Parsing EQ Q message: ${message}`);
    const match = message.match(/\+IN-(\d+)\.EQ-(\d+)\.Q (-?\d+\.\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse EQ Q message: ${message}`);
      return;
    }
    const [_, iid, eid, value] = match;
    if (!instance.state.inputEqBands[iid]) instance.state.inputEqBands[iid] = {};
    if (!instance.state.inputEqBands[iid][eid]) instance.state.inputEqBands[iid][eid] = {};
    instance.state.inputEqBands[iid][eid].q = parseFloat(value);
    instance.log('info', `Input ${iid} EQ band ${eid} Q set to ${value}`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.EQ-\d+\.BYPASS/)) {
    instance.log('debug', `Parsing EQ BYPASS message: ${message}`);
    const match = message.match(/\+IN-(\d+)\.EQ-(\d+)\.BYPASS (\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse EQ BYPASS message: ${message}`);
      return;
    }
    const [_, iid, eid, value] = match;
    if (!instance.state.inputEqBands[iid]) instance.state.inputEqBands[iid] = {};
    if (!instance.state.inputEqBands[iid][eid]) instance.state.inputEqBands[iid][eid] = {};
    instance.state.inputEqBands[iid][eid].bypass = parseInt(value, 10) === 1;
    instance.log('info', `Input ${iid} EQ band ${eid} bypass set to ${instance.state.inputEqBands[iid][eid].bypass}`);
    stateChanged = true;
  }

  // Zone detail parsing
  else if (message.match(/\+ZONE-[A-D]\.NAME/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.NAME "(.*)"/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneNames[zid] = value;
    instance.log('info', `Zone ${zid} name set to "${value}"`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.PRIMARY_SRC/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.PRIMARY_SRC (\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zonePrimarySrc[zid] = parseInt(value, 10);
    instance.log('info', `Zone ${zid} primary source set to IID ${value}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.PRIORITY_SRC/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.PRIORITY_SRC (\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zonePrioritySrc[zid] = parseInt(value, 10);
    instance.log('info', `Zone ${zid} priority source set to IID ${value}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.GAIN/)) {
    const match = message.match(/\+ZONE-([A-D])\.GAIN (-?\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE GAIN message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneGains[zid] = parseFloat(value);
    instance.log('info', `Zone ${zid} gain set to ${instance.state.zoneGains[zid].toFixed(2)} dB`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.GAIN_MIN/)) {
    const match = message.match(/\+ZONE-([A-D])\.GAIN_MIN (-?\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE GAIN_MIN message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneGainRanges[zid] = instance.state.zoneGainRanges[zid] || {};
    instance.state.zoneGainRanges[zid].min = parseFloat(value);
    instance.log('info', `Zone ${zid} gain min set to ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.GAIN_MAX/)) {
    const match = message.match(/\+ZONE-([A-D])\.GAIN_MAX (-?\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE GAIN_MAX message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneGainRanges[zid] = instance.state.zoneGainRanges[zid] || {};
    instance.state.zoneGainRanges[zid].max = parseFloat(value);
    instance.log('info', `Zone ${zid} gain max set to ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.STEREO/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.STEREO (\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneLinks[zid] = parseInt(value, 10); // 0 or 1
    instance.log('info', `Zone ${zid} stereo set to ${instance.state.zoneLinks[zid]}`);
    instance.log('debug', `Current zoneLinks state: ${JSON.stringify(instance.state.zoneLinks)}`);
    stateChanged = true; // Trigger preset update
  } else if (message.match(/\+ZONE-[A-D]\.GPIO_VC/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.GPIO_VC (\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneGpioVc[zid] = parseInt(value, 10);
    instance.log('info', `Zone ${zid} GPIO volume control set to ${value}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.MUTE/)) {
    const match = message.match(/\+ZONE-([A-D])\.MUTE (\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE MUTE message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneMutes[zid] = parseInt(value, 10) === 1;
    instance.log('info', `Zone ${zid} mute set to ${instance.state.zoneMutes[zid]}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.MUTE_ENABLE/)) {
    const match = message.match(/\+ZONE-([A-D])\.MUTE_ENABLE (\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE MUTE_ENABLE message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    instance.state.zoneMuteEnables[zid] = parseInt(value, 10) === 1;
    instance.log('info', `Zone ${zid} mute enable set to ${instance.state.zoneMuteEnables[zid]}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.SRC-\d+\.ENABLED/)) {
    const [_, zidLetter, sid, value] = message.match(/\+ZONE-([A-D])\.SRC-(\d+)\.ENABLED (\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneSrcEnabled[zid]) instance.state.zoneSrcEnabled[zid] = {};
    instance.state.zoneSrcEnabled[zid][sid] = parseInt(value, 10) === 1;
    instance.log('info', `Zone ${zid} source ${sid} enabled set to ${instance.state.zoneSrcEnabled[zid][sid]}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.MODE/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.DUCK\.MODE "(.*)"/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].mode = value;
    instance.log('info', `Zone ${zid} ducker mode set to ${value}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.AUTO/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.DUCK\.AUTO (\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].auto = parseInt(value, 10) === 1;
    instance.log('info', `Zone ${zid} ducker auto set to ${instance.state.zoneDucker[zid].auto}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.THRESHOLD/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.THRESHOLD (-?\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.THRESHOLD message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].threshold = parseFloat(value);
    instance.log('info', `Zone ${zid} ducker threshold set to ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.DEPTH/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.DEPTH (-?\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.DEPTH message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].depth = parseFloat(value);
    instance.log('info', `Zone ${zid} ducker depth set to ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.ATTACK/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.ATTACK (\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.ATTACK message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].attack = parseFloat(value);
    instance.log('info', `Zone ${zid} ducker attack set to ${value} seconds`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.RELEASE/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.RELEASE (\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.RELEASE message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].release = parseFloat(value);
    instance.log('info', `Zone ${zid} ducker release set to ${value} seconds`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.HOLD/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.HOLD (\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.HOLD message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].hold = parseFloat(value);
    instance.log('info', `Zone ${zid} ducker hold set to ${value} seconds`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.OVERRIDE_GAIN/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.OVERRIDE_GAIN (-?\d+\.?\d*)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.OVERRIDE_GAIN message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].overrideGain = parseFloat(value);
    instance.log('info', `Zone ${zid} ducker override gain set to ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DUCK\.OVERRIDE_GAIN_ENABLE/)) {
    const match = message.match(/\+ZONE-([A-D])\.DUCK\.OVERRIDE_GAIN_ENABLE (\d+)/);
    if (!match) {
      instance.log('warn', `Failed to parse ZONE DUCK.OVERRIDE_GAIN_ENABLE message: ${message}`);
      return;
    }
    const [_, zidLetter, value] = match;
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDucker[zid]) instance.state.zoneDucker[zid] = {};
    instance.state.zoneDucker[zid].overrideGainEnable = parseInt(value, 10) === 1;
    instance.log('info', `Zone ${zid} ducker override gain enable set to ${instance.state.zoneDucker[zid].overrideGainEnable}`);
    stateChanged = true;
  } else if (message.match(/#GET ZONE-[A-D]\..*\|Command Failed/)) {
    const zidLetter = message.match(/ZONE-([A-D])/)[1];
    instance.log('warn', `GET command failed for ZONE-${zidLetter}`);
  }

  // Subscription response parsing
  else if (message.match(/\+IN-\d+\.DYN\.SIGNAL/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.DYN\.SIGNAL (-?\d+\.\d+)/);
    if (!instance.state.inputDynamics) instance.state.inputDynamics = {};
    instance.state.inputDynamics[iid] = instance.state.inputDynamics[iid] || {};
    instance.state.inputDynamics[iid].signal = parseFloat(value);
    instance.log('debug', `Input ${iid} signal level: ${value} dB`);
    stateChanged = true;
  } else if (message.match(/\+IN-\d+\.DYN\.CLIP/)) {
    const [_, iid, value] = message.match(/\+IN-(\d+)\.DYN\.CLIP (\d+)/);
    if (!instance.state.inputDynamics) instance.state.inputDynamics = {};
    instance.state.inputDynamics[iid] = instance.state.inputDynamics[iid] || {};
    instance.state.inputDynamics[iid].clip = parseInt(value, 10);
    instance.log('debug', `Input ${iid} clip state: ${value}`);
    stateChanged = true;
  } else if (message.match(/\+ZONE-[A-D]\.DYN\.SIGNAL/)) {
    const [_, zidLetter, value] = message.match(/\+ZONE-([A-D])\.DYN\.SIGNAL (-?\d+\.\d+)/);
    const zid = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[zidLetter];
    if (!instance.state.zoneDynamics) instance.state.zoneDynamics = {};
    instance.state.zoneDynamics[zid] = instance.state.zoneDynamics[zid] || {};
    instance.state.zoneDynamics[zid].signal = parseFloat(value);
    instance.log('debug', `Zone ${zid} signal level: ${value} dB`);
    stateChanged = true;
  } else if (message.includes('#|E0: TXQueue Overflow - Messages dropped')) {
    instance.log('warn', 'TXQueue Overflow - Messages dropped; consider increasing polling delay');
  }

  // Catch unhandled responses (skip *GET echoes)
  else if (!message.startsWith('*GET') && !message.startsWith('*SET') && !message.startsWith('*SUBSCRIBE') && !message.startsWith('*UNSUBSCRIBE')) { 
    instance.log('warn', `Unhandled response: ${message}`);
  }

  if (stateChanged) {
    instance.checkFeedbacks();
  }

  if (stateChanged) {
    instance.emit('update_state');
    instance.updatePresets(); // Ensure presets refresh
  }
};