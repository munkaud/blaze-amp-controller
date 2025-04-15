const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const upgrade = require('./upgrades');
const State = require('./state');
const MessageProcessor = require('./message_processor');
const SocketManager = require('./socket_manager');
const { initActions } = require('./actions');
const { initFeedbacks } = require('./feedbacks');
const { initVariables, updateVariables } = require('./variables');
const { initPresets, updatePresetsDebounced } = require('./presets');

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
    this.updateStatus('connecting');
    await this.socketManager.setupSocket();
    initActions(this);
    initFeedbacks(this);
    initVariables(this);
    this.pendingUpdates = 20;
    this.updatePresetsDebounced();
    this.log('info', 'Initializing instance');
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