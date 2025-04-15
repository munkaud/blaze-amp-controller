class State {
    constructor() {
      this.state = {
        power: 'OFF',
        inputs: 0,
        inputNames: {},
        inputGains: {},
        stereoPairs: {},
        inputSensitivities: {},
        inputHpfEnable: {},
        inputEqBypass: {},
        inputEqCount: 0,
        inputEqBands: {},
        inputDynamics: {},
        zones: 0,
        zoneNames: { 1: 'Zone A', 2: 'Zone B', 3: 'Zone C', 4: 'Zone D' },
        zoneGains: {},
        zoneGainRanges: {},
        zoneLinks: {},
        zonePrimarySrc: {},
        zonePrioritySrc: {},
        zoneGpioVc: {},
        zoneMutes: {},
        zoneMuteEnables: {},
        zoneSrcEnabled: {},
        zoneDucker: {},
        zoneDynamics: {},
        outputs: 0,
        outputNames: {},
        zoneOutputs: {},
        expectedOutputs: 0,
        receivedOutputs: new Set(),
        isPollingComplete: false,
        apiVersion: '',
        systemSignalIn: '',
        systemSignalOut: '',
        systemLan: '',
        systemWifi: '',
        systemDeviceSwid: 0,
        systemDeviceHwid: 0,
        systemDeviceVendorName: '',
        systemDeviceModelName: '',
        systemDeviceSerial: '',
        systemDeviceFirmware: '',
        systemDeviceFirmwareDate: '',
        systemDeviceMac: '',
        systemDeviceWifiMac: '',
        setupSystemDeviceName: '',
        setupSystemVenueName: '',
        setupSystemCustomerName: '',
        setupSystemAssetTag: '',
        setupSystemInstallerName: '',
        setupSystemContactInfo: '',
        setupSystemInstallDate: '',
        setupSystemInstallNotes: '',
        setupSystemLocating: 0,
        setupSystemCustom1: '',
        setupSystemCustom2: '',
        setupSystemCustom3: '',
        generatorGain: 0,
        outputGains: {}, // OUT-{OID}.GAIN (Float, dB)
        outputMutes: {}, // OUT-{OID}.MUTE (Boolean)
        outputPolarities: {}, // OUT-{OID}.POLARITY (Integer)
        outputModes: {}, // OUT-{OID}.OUTPUT_MODE (Enum)
        outputHighpasses: {}, // OUT-{OID}.OUTPUT_HIGHPASS (Float, Hz)
        outputDynSignals: {}, // OUT-{OID}.DYN.SIGNAL (Float, dB)
        outputDynClips: {}, // OUT-{OID}.DYN.CLIP (Boolean)
      };
    }
  
    markUpdated() {
      console.info('State updated');
      // Add any additional logic for when the state changes (e.g., emit events, save to file)
    }
  
    getState() {
      return this.state;
    }
  
    setState(newState) {
      Object.assign(this.state, newState);
      this.markUpdated();
    }
  }
  
  module.exports = new State();