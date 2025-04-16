class InputsParser {
  constructor(instance) {
    this.instance = instance;
    this.state = instance.state;
  }

  parse(message) {
    const messages = message.split('\n').filter(msg => msg.trim() !== '');
    const primaryMessage = messages[0];

    if (primaryMessage.startsWith('+IN.COUNT')) {
      const count = parseInt(primaryMessage.split(' ')[1], 10);
      this.state.inputs = count;
      this.instance.log('info', `Input count set to ${count}`);
      return true;
    }

    if (primaryMessage.startsWith('+IN-')) {
      const parts = primaryMessage.split(' ');
      const [prefix, keyValue] = parts;
      const [inputId, key] = prefix.replace('+IN-', '').split('.');
      const value = parts.slice(1).join(' ').replace(/"/g, '');

      switch (key) {
        case 'NAME':
          this.state.inputNames[inputId] = value;
          this.instance.log('info', `Input ${inputId} name set to "${value}"`);
          break;
        case 'DYN.SIGNAL':
          this.state.inputDynSignals = this.state.inputDynSignals || {};
          this.state.inputDynSignals[inputId] = parseFloat(value);
          this.instance.log('info', `Input ${inputId} dynamic signal level set to ${this.state.inputDynSignals[inputId]} dB`);
          break;
        case 'DYN.CLIP':
          this.state.inputDynClips = this.state.inputDynClips || {};
          this.state.inputDynClips[inputId] = value === '1';
          this.instance.log('info', `Input ${inputId} dynamic clip set to ${this.state.inputDynClips[inputId]}`);
          break;
        default:
          this.instance.log('warn', `Unhandled input response: ${primaryMessage}`);
          return false;
      }
      return true;
    }

    return false;
  }
}

module.exports = InputsParser;