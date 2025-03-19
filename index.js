import { InstanceBase, InstanceStatus, runEntrypoint, TCPHelper } from '@companion-module/base';
import { ConfigFields } from './config.js';
import { getActionDefinitions } from './actions.js';
import { getPresetDefinitions} from './presets.js';

class BluesoundB100Instance extends InstanceBase {
    async init(config) {
        this.config = config;

        // Set the action definitions based on what actions we define in actions.js
        this.setActionDefinitions(getActionDefinitions(this));

        // Log action definitions for debugging
        this.log('info', 'Action definitions have been registered.');

        // Set the preset definitions based on what presets we have available in presets.js
        this.setPresetDefinitions(getPresetDefinitions(this));

        // Log action definitions for debugging
        this.log('info', 'Preset definitions have been registered.');

        // Call configUpdated to handle initial connection setup (simplified)
        await this.configUpdated(config);
    }

    async configUpdated(config) {
        this.config = config;

        // Log when the configUpdated function is called
        this.log('debug', 'Config updated with: ' + JSON.stringify(config));

        // Check if the host is configured
        if (this.socket) {
            this.socket.destroy()
            delete this.socket
        }
        if (this.config.host) {
            console.log('debug', 'Host configured, attempting to connect at: ' + this.config.host)
            if (this.config.prot === 'tcp'){
                this.init_tcp()
            }
        } else {
            this.updateStatus(InstanceStatus.BadConfig)
            console.log('error', 'No host configured.')
            
        }
    }

    // Return the configuration fields for web config
    getConfigFields() {
        return ConfigFields;
    }

    async destroy() {
        this.log('debug', 'Destroying connection...');
        // Add any clean-up code here if needed
    }
    init_tcp() {
        this.log('debug', 'Initializing TCP connection with host: ' + this.config.host + ', port: ' + this.config.port);
    
        if (this.socket) {
            this.socket.destroy()
            delete this.socket
        }
    
        // ✅ Enable this to update the connection status
        this.updateStatus(InstanceStatus.Connecting)
    
        if (this.config.host) {
            this.log('debug', 'Setting up TCP socket...');
            this.socket = new TCPHelper(this.config.host, this.config.port)
    
            this.socket.on('status_change', (status, message) => {
                this.updateStatus(status, message) // ✅ Make sure this line is active
                this.log('debug', 'TCP status change: ' + status + ', message: ' + message);
            })
    
            this.socket.on('error', (err) => {
                this.updateStatus(InstanceStatus.ConnectionFailure, err.message) // ✅ Report connection failures
                this.log('error', 'Network error: ' + err.message);
            })
    
            this.socket.on('data', (data) => {
                this.log('debug', 'Received data from TCP connection: ' + data);
                if (this.config.saveresponse) {
                    let dataResponse = data
    
                    if (this.config.convertresponse == 'string') {
                        dataResponse = data.toString()
                    } else if (this.config.convertresponse == 'hex') {
                        dataResponse = data.toString('hex')
                    }
    
                    this.setVariableValues({ tcp_response: dataResponse })
                }
            })
        } else {
            this.updateStatus(InstanceStatus.BadConfig) // ✅ Mark as bad config if no host
            this.log('error', 'No host specified for TCP connection.');
        }
    }
}

// Run the entry point for the module
runEntrypoint(BluesoundB100Instance, []);
