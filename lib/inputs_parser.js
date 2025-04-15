class InputsParser {
  constructor(instance) {
    this.instance = instance;
    this.state = instance.state;
  }

  parse(message) {
    // Input-related messages
    if (message.startsWith('+IN-')) {
      const parts = message.split(' ');
      const [prefix, keyValue] = parts;
      const [inputId, key] = prefix.replace('+IN-', '').split('.');
      const value = parts.slice(1).join(' ').replace(/"/g, '');

      switch (key) {
        case 'NAME':
          this.state.inputNames[inputId] = value;
          this.instance.log('info', `Input ${inputId} name set to "${value}"`);
          break;
        case 'GAIN':
          this.state.inputGains[inputId] = parseFloat(value);
          this.instance.log('info', `Input ${inputId} gain set to ${this.state.inputGains[inputId]} dB`);
          break;
        case 'STEREO':
          this.state.stereoPairs[inputId] = value === '1';
          this.instance.log('info', `Input ${inputId} stereo set to ${this.state.stereoPairs[inputId]}`);
          break;
        case 'SENS':
          this.state.inputSensitivities[inputId] = value;
          this.instance.log('info', `Input ${inputId} sensitivity set to ${value}`);
          break;
        case 'HPF_ENABLE':
          this.state.inputHpfEnable[inputId] = value === '1';
          this.instance.log('info', `Input ${inputId} HPF enable set to ${this.state.inputHpfEnable[inputId]}`);
          break;
        case 'EQ.BYPASS':
          this.state.inputEqBypass[inputId] = value === '1';
          this.instance.log('info', `Input ${inputId} EQ bypass set to ${this.state.inputEqBypass[inputId]}`);
          break;
        default:
          this.instance.log('warn', `Unhandled input response: ${message}`);
          return false;
      }
      return true;
    }

    return false;
  }
}

module.exports = InputsParser;