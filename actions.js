import {sendCommand} from './commands.js'

export function getActionDefinitions(instance) {
    return {
        play_pause: {
            options: [],
            name: 'Play/Pause',
            callback: async () => {
                instance.log('info', 'Play/Pause button has been triggered')
                await sendCommand(instance, '/Play')
            },
        },
    }
}