class OutputsParser {
  constructor(instance) {
    this.instance = instance;
    this.state = instance.state;
  }

  parse(message) {
    // Split the message on newlines to handle combined response + echoed command
    const messages = message.split('\n').filter(msg => msg.trim() !== '');
    const primaryMessage = messages[0]; // Process only the first part (the actual response)

    // Handle output count
    if (primaryMessage.startsWith('+OUT.COUNT')) {
      const count = parseInt(primaryMessage.split(' ')[1], 10);
      this.state.outputs = count;
      this.instance.log('info', `Output count set to ${count}`);

      // Queue commands to get more output info
      for (let i = 1; i <= count; i++) {
        this.instance.socketManager.queueCommand(`GET OUT-${i}.NAME\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.SRC\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.SRC_CHANNEL\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.GAIN\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.MUTE\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.POLARITY\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.OUTPUT_MODE\n`);
        this.instance.socketManager.queueCommand(`GET OUT-${i}.OUTPUT_HIGHPASS\n`);
        // Subscriptions for DYN.SIGNAL and DYN.CLIP will be handled separately
      }
      return true;
    }

    // Handle output-related messages
    if (primaryMessage.startsWith('+OUT-')) {
      const parts = primaryMessage.split(' ');
      const [prefix, keyValue] = parts;
      const [outputId, key] = prefix.replace('+OUT-', '').split('.');
      const value = parts.slice(1).join(' ').replace(/"/g, '');

      switch (key) {
        case 'NAME':
          this.state.outputNames[outputId] = value;
          this.instance.log('info', `Output ${outputId} name set to "${value}"`);
          break;
        case 'SRC':
          this.state.zonePrimarySrc[outputId] = value;
          this.instance.log('info', `Output ${outputId} source set to Zone ${value}`);
          break;
        case 'SRC_CHANNEL':
          if (value === 'S') {
            this.state.zoneOutputs[outputId] = 'Stereo';
            this.instance.log('info', `Output ${outputId} source channel set to Stereo`);
          } else if (value === 'L') {
            this.state.zoneOutputs[outputId] = 'Left';
            this.instance.log('info', `Output ${outputId} source channel set to Left`);
          } else if (value === 'R') {
            this.state.zoneOutputs[outputId] = 'Right';
            this.instance.log('info', `Output ${outputId} source channel set to Right`);
          } else {
            this.instance.log('warn', `Failed to parse output source channel: ${primaryMessage}`);
            return false;
          }
          break;
        case 'GAIN':
          this.state.outputGains[outputId] = parseFloat(value);
          this.instance.log('info', `Output ${outputId} gain set to ${this.state.outputGains[outputId]} dB`);
          break;
        case 'MUTE':
          this.state.outputMutes[outputId] = value === '1';
          this.instance.log('info', `Output ${outputId} mute set to ${this.state.outputMutes[outputId]}`);
          break;
        case 'POLARITY':
          this.state.outputPolarities[outputId] = parseInt(value, 10);
          this.instance.log('info', `Output ${outputId} polarity set to ${this.state.outputPolarities[outputId] === 1 ? 'Normal' : 'Reversed'}`);
          break;
        case 'OUTPUT_MODE':
          this.state.outputModes[outputId] = value;
          this.instance.log('info', `Output ${outputId} mode set to ${value}`);
          break;
        case 'OUTPUT_HIGHPASS':
          this.state.outputHighpasses[outputId] = parseFloat(value);
          this.instance.log('info', `Output ${outputId} highpass set to ${this.state.outputHighpasses[outputId]} Hz`);
          break;
        case 'DYN.SIGNAL':
          this.state.outputDynSignals[outputId] = parseFloat(value);
          this.instance.log('info', `Output ${outputId} dynamic signal level set to ${this.state.outputDynSignals[outputId]} dB`);
          break;
        case 'DYN.CLIP':
          this.state.outputDynClips[outputId] = value === '1';
          this.instance.log('info', `Output ${outputId} dynamic clip set to ${this.state.outputDynClips[outputId]}`);
          break;
        default:
          this.instance.log('warn', `Unhandled output response: ${primaryMessage}`);
          return false;
      }
      return true;
    }

    return false;
  }
}

module.exports = OutputsParser;