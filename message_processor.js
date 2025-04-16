const systemParser = require('./lib/system_parser');
const powerParser = require('./lib/power_parser');
const InputsParser = require('./lib/input_parser');
const zonesParser = require('./lib/zone_parser');
const OutputsParser = require('./lib/output_parser');
const miscParser = require('./lib/misc_parser');

class MessageProcessor {
  constructor(instance) {
    this.instance = instance;
    this.state = instance.state;
    this.inputsParser = new InputsParser(instance);
    this.outputsParser = new OutputsParser(instance);
  }

  process(message) {
    let stateChanged = false;

    try {
      // Run each parser in sequence, stop once a parser handles the message
      if (systemParser(this.instance, message)) {
        stateChanged = true;
      } else if (powerParser(this.instance, message)) {
        stateChanged = true;
      } else if (this.inputsParser.parse(message)) {
        stateChanged = true;
      } else if (zonesParser(this.instance, message)) {
        stateChanged = true;
      } else if (this.outputsParser.parse(message)) {
        stateChanged = true;
      } else if (miscParser(this.instance, message)) {
        stateChanged = true;
      }

      if (stateChanged) {
        this.instance.pendingUpdates++;
        this.instance.checkFeedbacks();
        this.instance.updateVariables();
        this.instance.updatePresetsDebounced();
      }
    } catch (error) {
      this.instance.log('error', `Error processing message "${message}": ${error.message}`);
    }

    return stateChanged;
  }
}

module.exports = MessageProcessor;