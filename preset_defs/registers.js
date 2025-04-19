const { combineRgb } = require('@companion-module/base');

module.exports = (self) => {
  const presets = [
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get API Version',
      style: { text: 'Get API Ver', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET API_VERSION', value: '' } }], up: [] }],
      feedbacks: []
    },
    // Add missing Base Registers
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get System State',
      style: { text: 'Get State', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.STATE', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get System Temperature',
      style: { text: 'Get Temp', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.TEMPERATURE', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get System Fan Status',
      style: { text: 'Get Fan', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.FAN', value: '' } }], up: [] }],
      feedbacks: []
    },
    // Existing Device Registers
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Signal In Status',
      style: { text: 'Get Signal In', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.SIGNAL_IN', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Signal Out Status',
      style: { text: 'Get Signal Out', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.SIGNAL_OUT', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get LAN Status',
      style: { text: 'Get LAN', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.LAN', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get WiFi Status',
      style: { text: 'Get WiFi', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.STATUS.WIFI', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device SWID',
      style: { text: 'Get SWID', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.SWID', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device HWID',
      style: { text: 'Get HWID', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.HWID', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device Vendor Name',
      style: { text: 'Get Vendor', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.VENDOR_NAME', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device Model Name',
      style: { text: 'Get Model', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.MODEL_NAME', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device Serial',
      style: { text: 'Get Serial', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.SERIAL', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device Firmware',
      style: { text: 'Get Firmware', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.FIRMWARE', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device Firmware Date',
      style: { text: 'Get FW Date', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.FIRMWARE_DATE', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device MAC Address',
      style: { text: 'Get MAC', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.MAC', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'System Registers',
      name: 'Get Device WiFi MAC Address',
      style: { text: 'Get WiFi MAC', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SYSTEM.DEVICE.WIFI_MAC', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Device Name',
      style: { text: 'Get Dev Name', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.DEVICE_NAME', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Device Name',
      style: { text: 'Set Dev Name', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.DEVICE_NAME BlazeAmp', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Venue Name',
      style: { text: 'Get Venue', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.VENUE_NAME', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Venue Name',
      style: { text: 'Set Venue', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.VENUE_NAME Venue', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Customer Name',
      style: { text: 'Get Cust Name', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.CUSTOMER_NAME', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Customer Name',
      style: { text: 'Set Cust Name', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.CUSTOMER_NAME Customer', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Asset Tag',
      style: { text: 'Get Asset Tag', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.ASSET_TAG', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Asset Tag',
      style: { text: 'Set Asset Tag', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.ASSET_TAG Tag', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Installer Name',
      style: { text: 'Get Installer', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.INSTALLER_NAME', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Installer Name',
      style: { text: 'Set Installer', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.INSTALLER_NAME Installer', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Contact Info',
      style: { text: 'Get Contact', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.CONTACT_INFO', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Contact Info',
      style: { text: 'Set Contact', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.CONTACT_INFO Info', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Install Date',
      style: { text: 'Get Inst Date', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.INSTALL_DATE', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Install Date',
      style: { text: 'Set Inst Date', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.INSTALL_DATE 2025-04-17', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Install Notes',
      style: { text: 'Get Inst Notes', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.INSTALL_NOTES', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Install Notes',
      style: { text: 'Set Inst Notes', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.INSTALL_NOTES Notes', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Locating',
      style: { text: 'Get Locating', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.LOCATING', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Locating',
      style: { text: 'Set Locating', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.LOCATING 0', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Custom 1',
      style: { text: 'Get Custom 1', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.CUSTOM1', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Custom 1',
      style: { text: 'Set Custom 1', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.CUSTOM1 Custom1', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Custom 2',
      style: { text: 'Get Custom 2', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.CUSTOM2', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Custom 2',
      style: { text: 'Set Custom 2', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.CUSTOM2 Custom2', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Get Custom 3',
      style: { text: 'Get Custom 3', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'GET SETUP.SYSTEM.CUSTOM3', value: '' } }], up: [] }],
      feedbacks: []
    },
    {
      type: 'button',
      category: 'Setup System Registers',
      name: 'Set Custom 3',
      style: { text: 'Set Custom 3', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [{ down: [{ actionId: 'sendCommand', options: { command: 'SET SETUP.SYSTEM.CUSTOM3 Custom3', value: '' } }], up: [] }],
      feedbacks: []
    }
  ];

  return presets;
};