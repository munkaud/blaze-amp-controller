const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const EventEmitter = require('events');
const socket = require('./lib/socket');
const parseResponse = require('./lib/parser');
const feedbacks = require('./feedbacks');
const powerPresets = require('./presets/power');
const setupPresets = require('./presets/setup');
const inputPresets = require('./presets/inputs');
const digitalPresets = require('./presets/digitals');
const zonePresets = require('./presets/zones');
const outputPresets = require('./presets/outputs');
const registersPresets = require('./presets/registers');

const powerActions = require('./actions/power_actions');
const subscribeActions = require('./actions/subscribe_actions');
const registersActions = require('./actions/registers_actions');
const inputActions = require('./actions/input_actions');
const inputEqActions = require('./actions/input_eq_actions');
const zoneActions = require('./actions/zone_actions');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    Object.assign(this, EventEmitter.prototype);
    EventEmitter.call(this);
    this.socket = null;
    this.state = { 
      power: 'unknown', 
      inputs: 0, 
      zones: 0, 
      outputs: 0, 
      inputNames: {}, 
      inputSensitivities: {}, 
      inputGains: {}, 
      inputHpfEnable: {},
      inputEqCount: 0,
      inputEqBypass: {},
      inputEqBands: {},
      generatorGain: null, 
      stereoPairs: {},
      zoneLinks: {},
      zonePrimarySrc: {},
      zonePrioritySrc: {},
      zoneNames: {},
      zoneGains: {},
      zoneGainRanges: {},
      zoneGpioVc: {},
      zoneMutes: {},
      zoneMuteEnables: {},
      zoneSrcEnabled: {},
      zoneDynamics: {},
      zoneDucker: {},
      outputNames: {},
      zoneOutputs: {},
      apiVersion: null,
      systemSignalIn: null,
      systemSignalOut: null,
      systemLan: null,
      systemWifi: null,
      systemDeviceSwid: null,
      systemDeviceHwid: null,
      systemDeviceVendorName: null,
      systemDeviceModelName: null,
      systemDeviceSerial: null,
      systemDeviceFirmware: null,
      systemDeviceFirmwareDate: null,
      systemDeviceMac: null,
      systemDeviceWifiMac: null,
      setupSystemDeviceName: null,
      setupSystemVenueName: null,
      setupSystemCustomerName: null,
      setupSystemAssetTag: null,
      setupSystemInstallerName: null,
      setupSystemContactInfo: null,
      setupSystemInstallDate: null,
      setupSystemInstallNotes: null,
      setupSystemLocating: null,
      setupSystemCustom1: null,
      setupSystemCustom2: null,
      setupSystemCustom3: null,
    };
    this.initialized = false;
    this.updatePresetsDebounced = this.debounce(this.updatePresets.bind(this), 250);
    this.pollingComplete = false;
    this.connected = false;
  }

  async init(config) {
    this.config = config;
    this.log('debug', 'Initializing instance');

    const actions = {
      ...powerActions(this),
      ...subscribeActions(this),
      ...registersActions(this),
      ...inputActions(this),
      ...inputEqActions(this),
      ...zoneActions(this),
    };
    this.setActionDefinitions(actions);
    this.setFeedbackDefinitions(feedbacks(this));
    this.initVariables(); // Add variable initialization

    socket.initSocket(this);

    this.once('socket_connected', () => {
      if (!this.connected) {
        this.log('info', 'Connected to Blaze Audio amplifier');
        this.connected = true;
        this.startPolling();
      }
    });

    this.on('update_state', () => {
      if (this.pollingComplete) {
        this.log('debug', 'update_state triggered, running updatePresetsDebounced');
        this.updatePresetsDebounced();
      }
    });
  }

  initVariables() {
    const variables = [];
    for (let zid = 1; zid <= 4; zid++) {
      variables.push({
        name: `Zone ${zid} Name`,
        variableId: `zone_name_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Gain`,
        variableId: `zone_gain_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Mute`,
        variableId: `zone_mute_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Primary Source`,
        variableId: `zone_primary_src_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Priority Source`,
        variableId: `zone_priority_src_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Mode`,
        variableId: `zone_ducker_mode_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Auto`,
        variableId: `zone_ducker_auto_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Threshold`,
        variableId: `zone_ducker_threshold_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Depth`,
        variableId: `zone_ducker_depth_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Attack`,
        variableId: `zone_ducker_attack_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Release`,
        variableId: `zone_ducker_release_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Hold`,
        variableId: `zone_ducker_hold_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Override Gain`,
        variableId: `zone_ducker_override_gain_${zid}`,
      });
      variables.push({
        name: `Zone ${zid} Ducker Override Gain Enable`,
        variableId: `zone_ducker_override_gain_enable_${zid}`,
      });
    }
    this.setVariableDefinitions(variables);
  }

  updateVariables() {
    const values = {};
    for (let zid = 1; zid <= this.state.zones; zid++) {
      values[`zone_name_${zid}`] = this.state.zoneNames[zid] || 'Unknown';
      values[`zone_gain_${zid}`] = this.state.zoneGains[zid] !== undefined ? this.state.zoneGains[zid].toFixed(1) : 'Unknown';
      values[`zone_mute_${zid}`] = this.state.zoneMutes[zid] ? 'Muted' : 'Unmuted';
      values[`zone_primary_src_${zid}`] = this.state.zonePrimarySrc[zid] || 'None';
      values[`zone_priority_src_${zid}`] = this.state.zonePrioritySrc[zid] || 'None';
      values[`zone_ducker_mode_${zid}`] = this.state.zoneDucker[zid]?.mode || 'OFF';
      values[`zone_ducker_auto_${zid}`] = this.state.zoneDucker[zid]?.auto ? 'Enabled' : 'Disabled';
      values[`zone_ducker_threshold_${zid}`] = this.state.zoneDucker[zid]?.threshold !== undefined ? this.state.zoneDucker[zid].threshold.toFixed(1) : 'Unknown';
      values[`zone_ducker_depth_${zid}`] = this.state.zoneDucker[zid]?.depth !== undefined ? this.state.zoneDucker[zid].depth.toFixed(1) : 'Unknown';
      values[`zone_ducker_attack_${zid}`] = this.state.zoneDucker[zid]?.attack !== undefined ? this.state.zoneDucker[zid].attack.toFixed(3) : 'Unknown';
      values[`zone_ducker_release_${zid}`] = this.state.zoneDucker[zid]?.release !== undefined ? this.state.zoneDucker[zid].release.toFixed(3) : 'Unknown';
      values[`zone_ducker_hold_${zid}`] = this.state.zoneDucker[zid]?.hold !== undefined ? this.state.zoneDucker[zid].hold.toFixed(3) : 'Unknown';
      values[`zone_ducker_override_gain_${zid}`] = this.state.zoneDucker[zid]?.overrideGain !== undefined ? this.state.zoneDucker[zid].overrideGain.toFixed(1) : 'Unknown';
      values[`zone_ducker_override_gain_enable_${zid}`] = this.state.zoneDucker[zid]?.overrideGainEnable ? 'Enabled' : 'Disabled';
    }
    this.setVariableValues(values);
  }

  startPolling() {
    this.log('debug', 'Starting full polling');
    const commands = [
      'GET SYSTEM.STATUS.STATE\n',
      'GET IN.COUNT\n',
      'GET ZONE.COUNT\n',
      'GET OUT.COUNT\n',
      'GET IN.EQ.COUNT\n',
      'GET API_VERSION\n',
      'GET SYSTEM.STATUS.SIGNAL_IN\n',
      'GET SYSTEM.STATUS.SIGNAL_OUT\n',
      'GET SYSTEM.STATUS.LAN\n',
      'GET SYSTEM.STATUS.WIFI\n',
      'GET SYSTEM.TEMPERATURE\n',
      'GET SYSTEM.FAN\n',
      'GET SYSTEM.VERSION\n',
      'GET SYSTEM.DEVICE.SWID\n',
      'GET SYSTEM.DEVICE.HWID\n',
      'GET SYSTEM.DEVICE.VENDOR_NAME\n',
      'GET SYSTEM.DEVICE.MODEL_NAME\n',
      'GET SYSTEM.DEVICE.SERIAL\n',
      'GET SYSTEM.DEVICE.FIRMWARE\n',
      'GET SYSTEM.DEVICE.FIRMWARE_DATE\n',
      'GET SYSTEM.DEVICE.MAC\n',
      'GET SYSTEM.DEVICE.WIFI_MAC\n',
      'GET SETUP.SYSTEM.DEVICE_NAME\n',
      'GET SETUP.SYSTEM.VENUE_NAME\n',
      'GET SETUP.SYSTEM.CUSTOMER_NAME\n',
      'GET SETUP.SYSTEM.ASSET_TAG\n',
      'GET SETUP.SYSTEM.INSTALLER_NAME\n',
      'GET SETUP.SYSTEM.CONTACT_INFO\n',
      'GET SETUP.SYSTEM.INSTALL_DATE\n',
      'GET SETUP.SYSTEM.INSTALL_NOTES\n',
      'GET SETUP.SYSTEM.LOCATING\n',
      'GET SETUP.SYSTEM.CUSTOM1\n',
      'GET SETUP.SYSTEM.CUSTOM2\n',
      'GET SETUP.SYSTEM.CUSTOM3\n',
    ];
    let delay = 0;
    const commandDelay = 250;
    commands.forEach(cmd => {
      setTimeout(() => this.socket.send(cmd), delay);
      delay += commandDelay;
    });

    setTimeout(() => {
      this.pollingComplete = true;
      this.updatePresetsDebounced();
      this.setFeedbackDefinitions(feedbacks(this));
      this.checkFeedbacks();
    }, delay + 500);

    this.on('update_state', () => {
      if (this.pollingComplete) {
        this.log('debug', 'update_state triggered, running updatePresetsDebounced');
        this.updatePresetsDebounced();
      }
    });
  }

  async configUpdated(config) {
    this.config = config;
    socket.initSocket(this);
    if (!this.connected) {
      this.connected = true;
      this.startPolling();
    }
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Target IP', width: 8, default: '192.168.1.100' },
      { type: 'number', id: 'port', label: 'Target Port', width: 4, default: 9999, min: 1, max: 65535 },
    ];
  }

  updatePresets() {
    this.updateVariables(); // Ensure variables are updated before presets
    this.setPresetDefinitions([
      ...powerPresets(this),
      ...setupPresets(this),
      ...inputPresets(this),
      ...digitalPresets(this),
      ...zonePresets(this),
      ...outputPresets(this),
      ...registersPresets(this),
    ]);
  }

  async destroy() {
    socket.destroySocket(this);
    this.log('info', 'Instance destroyed');
  }

  debounce(fn, ms) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), ms);
    };
  }
}

runEntrypoint(BlazeAudioInstance, []);