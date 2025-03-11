import { InstanceBase, InstanceStatus, runEntrypoint, TCPHelper } from '@companion-module/base';
import { ConfigFields } from '../config.js';
import { getActionDefinitions } from '../actions.js';

class BluesoundB100Instance extends InstanceBase {
    async init(config) {
        this.config = config

        // Set the action definitions based on what actions we define in actions.js
        this.setActionDefinitions(getActionDefinitions(this))

        // Call configUpdated to handle initial connection setup
        await this.configUpdated(config)
    }

    async configUpdated(config) {
        this.log('debug', 'Config updated with: ' + JSON.stringify(config));
    
        if (this.udp) {
            this.udp.destroy()
            delete this.udp
        }
    
        if (this.socket) {
            this.socket.destroy()
            delete this.socket
        }
    
        this.config = config
        // log when the configUpdated function is called
        console.log('Config Updated:', this.config)
        //Check to see if a host is configured
        if (this.config.host){
            console.log('Attempting to connect to Bluesound device at: ', this.config.host);

        if (this.config.prot == 'tcp') {
            this.log('debug', 'Initializing TCP...');
            this.init_tcp()
            this.init_tcp_variables()
        }
    } else {
        console.log('No host configured for Bluesound Device.');
        this.updateStatus(InstanceStatus.BadConfig)
    }
        if (this.config.prot == 'udp') {
            this.log('debug', 'Initializing UDP...');
            this.init_udp()
            this.setVariableDefinitions([])
        }
    }

    async destroy() {
        this.log('debug', 'Destroying connection...');
    
        if (this.socket) {
            this.socket.destroy()
            this.log('debug', 'TCP connection destroyed.');
        } else if (this.udp) {
            this.udp.destroy()
            this.log('debug', 'UDP connection destroyed.');
        } else {
            this.updateStatus(InstanceStatus.Disconnected)
            this.log('debug', 'No active connection to destroy.');
        }
    }

    // Return the configuration fields for web config
    getConfigFields() {
        return ConfigFields
    }

    init_tcp() {
        this.log('debug', 'Initializing TCP connection with host: ' + this.config.host + ', port: ' + this.config.port);
    
        if (this.socket) {
            this.socket.destroy()
            delete this.socket
        }
    
        this.updateStatus(InstanceStatus.Connecting)
    
        if (this.config.host) {
            this.log('debug', 'Setting up TCP socket...');
            this.socket = new TCPHelper(this.config.host, this.config.port)
    
            this.socket.on('status_change', (status, message) => {
                this.updateStatus(status, message)
                this.log('debug', 'TCP status change: ' + status + ', message: ' + message);
            })
    
            this.socket.on('error', (err) => {
                this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
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
            this.updateStatus(InstanceStatus.BadConfig)
            this.log('error', 'No host specified for TCP connection.');
        }
    }

    // Initialize variables that we will use in actions or responses
    init_tcp_variables() {
        this.setVariableDefinitions([{ name: 'Last TCP Response', variableId: 'tcp_response' }])

        this.setVariableValues({ tcp_response: '' })
    }
}

// Run the entry point for the module
runEntrypoint(BluesoundB100Instance, [])