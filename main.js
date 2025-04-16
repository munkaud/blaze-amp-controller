const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const upgrade = require('./upgrades');
const State = require('./state');
const MessageProcessor = require('./message_processor');
const SocketManager = require('./socket_manager');
const { initActions } = require('./actions');
const { initFeedbacks } = require('./feedbacks');
const { initVariables, updateVariables } = require('./variables');
const { initPresets, updatePresetsDebounced } = require('./presets');
const config = require('./lib/config');

class BlazeAudioInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.state = State.getState();
    this.presetUpdateQueue = [];
    this.presetUpdateDebounce = null;
    this.pendingUpdates = 0;
    this.messageProcessor = new MessageProcessor(this);
    this.socketManager = new SocketManager(this);
  }

  async init(config) {
    this.config = config;
    this.log('info', 'Initializing instance');
    
    // Load actions from multiple files with debugging
    const inputActionsModule = require('./actions/input_actions');
    this.log('debug', `inputActionsModule type: ${typeof inputActionsModule}`);
    const inputEQActionsModule = require('./actions/input_eq_actions');
    this.log('debug', `inputEQActionsModule type: ${typeof inputEQActionsModule}`);
    //const mixActionsModule = require('./actions/mix_actions');
    //this.log('debug', `mixActionsModule type: ${typeof mixActionsModule}`);
    const outputActionsModule = require('./actions/output_actions');
    this.log('debug', `outputActionsModule type: ${typeof outputActionsModule}`);
    const registersActionsModule = require('./actions/registers_actions');
    this.log('debug', `registersActionsModule type: ${typeof registersActionsModule}`);
    const subscribeActionsModule = require('./actions/subscribe_actions');
    this.log('debug', `subscribeActionsModule type: ${typeof subscribeActionsModule}`);
    const zoneActionsModule = require('./actions/zone_actions');
    this.log('debug', `zoneActionsModule type: ${typeof zoneActionsModule}`);
    const powerActionsModule = require('./actions/power_actions');
    this.log('debug', `powerActionsModule type: ${typeof powerActionsModule}`);
    
    const combinedActions = {
      ...inputActionsModule(this),
      ...inputEQActionsModule(this),
      //...mixActionsModule(this),
      ...outputActionsModule(this),
      ...registersActionsModule(this),
      ...subscribeActionsModule(this),
      ...zoneActionsModule(this),
      ...powerActionsModule(this),
    };
    this.log('debug', `Registered actions: ${Object.keys(combinedActions).join(', ')}`);
    this.setActionDefinitions(combinedActions);
    
    const feedbacksModule = require('./feedbacks');
    this.log('debug', `feedbacksModule type: ${typeof feedbacksModule}`);
    this.setFeedbackDefinitions(feedbacksModule(this));
    
    await this.socketManager.setupSocket();

    setTimeout(() => {
      this.initialPollingDone = true;
      this.log('info', 'Initial polling complete, generating presets');
      this.pendingUpdates = 30;
      this.updatePresetsDebounced();
    }, 20000);
  }

  getConfigFields() {
    return config.getConfigFields();
  }

  async destroy() {
    this.socketManager.destroy();
    this.log('info', 'Instance destroyed');
  }

  async configUpdated(config) {
    this.config = config;
    this.updateStatus('connecting');
    await this.socketManager.setupSocket();
  }

  // Expose these methods for MessageProcessor to call
  updateVariables() {
    updateVariables(this);
  }

  updatePresetsDebounced() {
    updatePresetsDebounced(this);
  }
}

runEntrypoint(BlazeAudioInstance, upgrade);