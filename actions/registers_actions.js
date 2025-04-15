module.exports = function (self) {
    return {
      getApiVersion: {
        name: 'Get API Version',
        options: [],
        callback: async () => {
          self.socket.send('GET API_VERSION\n');
        },
      },
      getSystemSignalIn: {
        name: 'Get System Signal In Status',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.STATUS.SIGNAL_IN\n');
        },
      },
      getSystemSignalOut: {
        name: 'Get System Signal Out Status',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.STATUS.SIGNAL_OUT\n');
        },
      },
      getSystemLan: {
        name: 'Get System LAN Status',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.STATUS.LAN\n');
        },
      },
      getSystemWifi: {
        name: 'Get System WiFi Status',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.STATUS.WIFI\n');
        },
      },
      getSystemTemperature: {
        name: 'Get System Temperature',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.TEMPERATURE\n');
        },
      },
      getSystemFan: {
        name: 'Get System Fan Status',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.FAN\n');
        },
      },
      getSystemVersion: {
        name: 'Get System Version',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.VERSION\n');
        },
      },
      getSystemDeviceSwid: {
        name: 'Get System Device SWID',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.SWID\n');
        },
      },
      getSystemDeviceHwid: {
        name: 'Get System Device HWID',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.HWID\n');
        },
      },
      getSystemDeviceVendorName: {
        name: 'Get System Device Vendor Name',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.VENDOR_NAME\n');
        },
      },
      getSystemDeviceModelName: {
        name: 'Get System Device Model Name',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.MODEL_NAME\n');
        },
      },
      getSystemDeviceSerial: {
        name: 'Get System Device Serial',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.SERIAL\n');
        },
      },
      getSystemDeviceFirmware: {
        name: 'Get System Device Firmware',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.FIRMWARE\n');
        },
      },
      getSystemDeviceFirmwareDate: {
        name: 'Get System Device Firmware Date',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.FIRMWARE_DATE\n');
        },
      },
      getSystemDeviceMac: {
        name: 'Get System Device MAC Address',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.MAC\n');
        },
      },
      getSystemDeviceWifiMac: {
        name: 'Get System Device WiFi MAC Address',
        options: [],
        callback: async () => {
          self.socket.send('GET SYSTEM.DEVICE.WIFI_MAC\n');
        },
      },
      getSetupSystemDeviceName: {
        name: 'Get Setup System Device Name',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.DEVICE_NAME\n');
        },
      },
      setSetupSystemDeviceName: {
        name: 'Set Setup System Device Name',
        options: [
          {
            type: 'textinput',
            label: 'Device Name (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.DEVICE_NAME "${action.options.value}"\n`);
        },
      },
      getSetupSystemVenueName: {
        name: 'Get Setup System Venue Name',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.VENUE_NAME\n');
        },
      },
      setSetupSystemVenueName: {
        name: 'Set Setup System Venue Name',
        options: [
          {
            type: 'textinput',
            label: 'Venue Name (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.VENUE_NAME "${action.options.value}"\n`);
        },
      },
      getSetupSystemCustomerName: {
        name: 'Get Setup System Customer Name',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.CUSTOMER_NAME\n');
        },
      },
      setSetupSystemCustomerName: {
        name: 'Set Setup System Customer Name',
        options: [
          {
            type: 'textinput',
            label: 'Customer Name (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.CUSTOMER_NAME "${action.options.value}"\n`);
        },
      },
      getSetupSystemAssetTag: {
        name: 'Get Setup System Asset Tag',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.ASSET_TAG\n');
        },
      },
      setSetupSystemAssetTag: {
        name: 'Set Setup System Asset Tag',
        options: [
          {
            type: 'textinput',
            label: 'Asset Tag (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.ASSET_TAG "${action.options.value}"\n`);
        },
      },
      getSetupSystemInstallerName: {
        name: 'Get Setup System Installer Name',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.INSTALLER_NAME\n');
        },
      },
      setSetupSystemInstallerName: {
        name: 'Set Setup System Installer Name',
        options: [
          {
            type: 'textinput',
            label: 'Installer Name (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.INSTALLER_NAME "${action.options.value}"\n`);
        },
      },
      getSetupSystemContactInfo: {
        name: 'Get Setup System Contact Info',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.CONTACT_INFO\n');
        },
      },
      setSetupSystemContactInfo: {
        name: 'Set Setup System Contact Info',
        options: [
          {
            type: 'textinput',
            label: 'Contact Info (max 32 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,32}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.CONTACT_INFO "${action.options.value}"\n`);
        },
      },
      getSetupSystemInstallDate: {
        name: 'Get Setup System Install Date',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.INSTALL_DATE\n');
        },
      },
      setSetupSystemInstallDate: {
        name: 'Set Setup System Install Date',
        options: [
          {
            type: 'textinput',
            label: 'Install Date (max 64 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,64}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.INSTALL_DATE "${action.options.value}"\n`);
        },
      },
      getSetupSystemInstallNotes: {
        name: 'Get Setup System Install Notes',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.INSTALL_NOTES\n');
        },
      },
      setSetupSystemInstallNotes: {
        name: 'Set Setup System Install Notes',
        options: [
          {
            type: 'textinput',
            label: 'Install Notes (max 256 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,256}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.INSTALL_NOTES "${action.options.value}"\n`);
        },
      },
      getSetupSystemLocating: {
        name: 'Get Setup System Locating',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.LOCATING\n');
        },
      },
      setSetupSystemLocating: {
        name: 'Set Setup System Locating',
        options: [
          {
            type: 'dropdown',
            label: 'Locating State',
            id: 'value',
            default: '0',
            choices: [
              { id: '0', label: 'Off' },
              { id: '1', label: 'On' },
            ],
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.LOCATING ${action.options.value}\n`);
        },
      },
      getSetupSystemCustom1: {
        name: 'Get Setup System Custom 1',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.CUSTOM1\n');
        },
      },
      setSetupSystemCustom1: {
        name: 'Set Setup System Custom 1',
        options: [
          {
            type: 'textinput',
            label: 'Custom 1 (max 8192 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,8192}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.CUSTOM1 "${action.options.value}"\n`);
        },
      },
      getSetupSystemCustom2: {
        name: 'Get Setup System Custom 2',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.CUSTOM2\n');
        },
      },
      setSetupSystemCustom2: {
        name: 'Set Setup System Custom 2',
        options: [
          {
            type: 'textinput',
            label: 'Custom 2 (max 8192 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,8192}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.CUSTOM2 "${action.options.value}"\n`);
        },
      },
      getSetupSystemCustom3: {
        name: 'Get Setup System Custom 3',
        options: [],
        callback: async () => {
          self.socket.send('GET SETUP.SYSTEM.CUSTOM3\n');
        },
      },
      setSetupSystemCustom3: {
        name: 'Set Setup System Custom 3',
        options: [
          {
            type: 'textinput',
            label: 'Custom 3 (max 8192 chars)',
            id: 'value',
            default: '',
            regex: '/^.{0,8192}$/',
          },
        ],
        callback: async (action) => {
          self.socket.send(`SET SETUP.SYSTEM.CUSTOM3 "${action.options.value}"\n`);
        },
      },
    };
  };