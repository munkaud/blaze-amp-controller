import { InstanceBase, InstanceStatus, runEntrypoint, TCPHelper } from '@companion-module/base';
import { ConfigFields } from './config.js';
import { getActionDefinitions } from './actions.js';
import { getPresetDefinitions } from './presets.js';
import { getFeedbackDefinitions } from './feedback.js';

class BluesoundB100Instance extends InstanceBase {
    async init(config) {
        this.config = config;
        this.searchResults = []; // Initialize search results array

        // Register action, preset, and feedback definitions
        this.setActionDefinitions(getActionDefinitions(this));
        this.setPresetDefinitions(getPresetDefinitions(this));
        this.setFeedbackDefinitions(getFeedbackDefinitions(this));
        
        this.log('info', 'Module initialized.');
        await this.configUpdated(config);
    }

    async configUpdated(config) {
        this.config = config;
        this.log('debug', 'Config updated with: ' + JSON.stringify(config));

        if (this.socket) {
            this.socket.destroy();
            delete this.socket;
        }

        if (this.config.host) {
            this.log('debug', 'Host configured, attempting to connect at: ' + this.config.host);
            if (this.config.protocol === 'tcp') {
                this.init_tcp();
            }
        } else {
            this.updateStatus(InstanceStatus.BadConfig);
            this.log('error', 'No host configured.');
        }
    }

    setFeedbackOptions(id, options) {
        if (this.FeedbackOptions === undefined) {
            this.feedbackOptions = {};
        }
        this.feedbackOptions[id] = options;
        this.checkFeedbacks(id);
    }

    getConfigFields() {
        return ConfigFields;
    }

    async destroy() {
        this.log('debug', 'Destroying connection...');
        if (this.socket) {
            this.socket.destroy();
            delete this.socket;
        }
        this.updateStatus(InstanceStatus.Disconnected);
    }

    init_tcp() {
        this.log('debug', 'Initializing TCP connection with host: ' + this.config.host + ', port: ' + this.config.port);

        if (this.socket) {
            this.socket.destroy();
            delete this.socket;
        }

        this.updateStatus(InstanceStatus.Connecting);

        if (this.config.host) {
            this.socket = new TCPHelper(this.config.host, this.config.port);

            this.socket.on('status_change', (status, message) => {
                this.updateStatus(status, message);
                this.log('debug', 'TCP status change: ' + status + ', message: ' + message);
            });

            this.socket.on('error', (err) => {
                this.updateStatus(InstanceStatus.ConnectionFailure, err.message);
                this.log('error', 'Network error: ' + err.message);
            });

            this.socket.on('data', (data) => {
                this.log('debug', 'Received data from TCP connection: ' + data);
                if (this.config.saveresponse) {
                    let dataResponse = data;

                    if (this.config.convertresponse === 'string') {
                        dataResponse = data.toString();
                    } else if (this.config.convertresponse === 'hex') {
                        dataResponse = data.toString('hex');
                    }

                    this.setVariableValues({ tcp_response: dataResponse });
                }
            });
        } else {
            this.updateStatus(InstanceStatus.BadConfig);
            this.log('error', 'No host specified for TCP connection.');
        }
    }
}
