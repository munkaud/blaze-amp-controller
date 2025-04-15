module.exports = function (instance, message) {
    let stateChanged = false;
  
    // System register parsing
    if (message.startsWith('+API_VERSION')) {
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
  
    return stateChanged;
  };