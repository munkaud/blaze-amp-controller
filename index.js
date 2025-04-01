console.log('index.js is loading...')

    import { InstanceBase, runEntrypoint, TCPHelper} from '@companion-module/base'
    import { initBasicPresets } from './presets/basic_preset_setup.js'
    import { initAdvancedPresets } from './presets/adv_preset_setup.js'
    import { registerBasicActions } from './presets/basic_preset_logic.js'
    import { registerAdvancedActions } from './presets/adv_preset_logic.js'
    import { setupConnection } from './connection_setup.js'
    import { getConfigFields } from './config.js'

    import * as net from 'net'
    //import { getActionDefinitions } from './actions.js'
    //import { getPresetDefinitions } from './presets.js'
    console.log('Imports Loaded ASuccessfully')

class BluesoundInstance extends InstanceBase {
    constructor(internal) {
        super(internal)
        this.log('debug', 'Bluesound Instance Constructor has been called')
        this.getConfigFields = getConfigFields
    }

    async init(config) {
        this.log('debug', `Starting init`)
        
        this.config = config
        this.updateStatus('connecting')
    
        try {
            this.log('debug', `Calling setupConnection()`)
            await setupConnection(this)
            this.log('debug', `setupConnection() completed`)
    
            // Register actions and store them properly
            const basicActions = registerBasicActions(this)
            const advancedActions = registerAdvancedActions(this)
    
            this.setActionDefinitions({
                ...basicActions,
                ...advancedActions,
            })
    
            this.log('debug', `Actions registered`)
    
            // ✅ Initialize and register presets
            const basicPresets = initBasicPresets(this)
            const advancedPresets = initAdvancedPresets(this)
    
            this.log('debug', `Basic Presets: ${JSON.stringify(basicPresets)}`)
            this.log('debug', `Advanced Presets: ${JSON.stringify(advancedPresets)}`)
    
            this.setPresetDefinitions({
                ...basicPresets,
                ...advancedPresets,
            })
    
            this.log('debug', `Presets registered`)
    
            this.updateStatus('ok')
            this.log('info', 'Module initialized successfully')
        } catch (error) {
            this.updateStatus('error', error.message)
            this.log('error', `Initialization failed: ${error.message}`)
        }
    }  
}

runEntrypoint(BluesoundInstance)
