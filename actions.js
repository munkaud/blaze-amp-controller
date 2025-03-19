import {sendCommand} from './commands.js'

export function getActionDefinitions(instance) {
    return {
        b100_play_pause: {
            options: [],
            name: 'Play/Pause',
            callback: async () => {
                instance.log('info', 'Play/Pause button has been triggered')
                await sendCommand(instance, '/Pause?toggle=1')
            },
        },
        b100_skip_forward: {
            options: [],
            name: 'Skip',
            callback: async () => {
                instance.log('info', 'Skip Forward button has been triggered')
                await sendCommand(instance, '/Skip')
            },
        },
        b100_skip_back: {
            options: [],
            name: 'Back',
            callback: async () => {
                instance.log('info', 'Skip Back button has been triggered')
                await sendCommand(instance, '/Back')
            },
        },
    }
}