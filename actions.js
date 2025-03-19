import {sendCommand, loadUrl} from './commands.js'

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
        b100_track_seek: {
            name: 'Play Specific Track',
            options: [
                {
                    type: 'textinput',
                    id: 'track_uri',
                    label: 'Track URI',
                    tooltip: 'Enter Track URI',
                    default: '',
                    useVariables: true,
                },
                {
                    type: 'number',
                    id: 'seek_time',
                    label: 'Move Playhead to (in seconds)',
                    tooltip: 'Enter a time in seconds of where to begin playback',
                    default: 0,
                    min: 0,
                    step: 1, // Added step
                }
            ],
            callback: async (event) => {
                const trackURI = event.options.track_uri
                const seekTime = event.options.seek_time
                instance.log('info', `Loading Track: ${trackURI} at ${seekTime}s`)
                await loadUrl(instance, trackURI, seekTime)
            },
        }
        
    }
}