// Define the UI for the basic presets
export function initBasicPresets(self) {
    return {
        b100_play_pause: {
            type: 'button',
            category: 'Playback',
            name: 'Play/Pause',
            style: {
                text: 'Play/Pause',
                size: '14',
                color: '#FFFFFF',
                bgcolor: '#000000',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'b100_play_pause',
                            options: {},
                        },
                    ],
                    up: [],
                },
            ],
            feedbacks: [],
        },
        b100_skip_forward: {
            type: 'button',
            category: 'Playback',
            name: 'Skip Forward',
            style: {
                text: 'Next\n⏭️',
                size: '14',
                color: '#FFFFFF',
                bgcolor: '#000000',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'b100_skip_forward',
                        },
                    ],
                    up: [],
                },
            ],
            feedbacks: [],
        },
        b100_skip_back: {
            type: 'button',
            category: 'Playback',
            name: 'Skip Back',
            style: {
                text: 'Last\n⏮️',
                size: '14',
                color: '#FFFFFF',
                bgcolor: '#000000',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'b100_skip_back',
                        },
                    ],
                    up: [],
                },
            ],
            feedbacks: [],
        },
        b100_volumeUp: {
            type: 'button',
            category: 'Playback',
            name: 'Volume Up',
            style: {
                text: 'Volume \n Up',
                size: '14',
                color: '#FFFFFF',
                bgcolor: '#000000',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'b100_volumeUp',
                            //options: {},
                        },
                    ],
                    up: [],
                },
            ],
            feedbacks: [],
        },
        b100_volumeDown: {
            type: 'button',
            category: 'Playback',
            name: 'Volume Down',
            style: {
                text: 'Volume \n Down',
                size: '14',
                color: '#FFFFFF',
                bgcolor: '#000000',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'b100_volumeDown',
                            //options: {},
                        },
                    ],
                    up: [],
                },
            ],
            feedbacks: [],
        },
    };
}

// Now add the feedback part:
export function registerBasicActions(self) {
    return {
        b100_play_pause: {
            name: 'Play/Pause',
            description: 'Toggle play/pause on the B100',
            options: [],
            callback: async function (action, context) {
                const cmd = `/Pause?toggle=1`; // Correct API command
                self.log('debug', `Sending command: ${cmd}`);
                try {
                    await self.sendCommand(cmd);
                    self.log('info', 'Play/Pause command sent successfully');
                } catch (error) {
                    self.log('error', `Failed to send command: ${error.message}`);
                }
            },
        },
        b100_skip_forward: {
            name: 'Skip Forward',
            description: 'Skip to the next track',
            options: [],
            callback: async () => {
                const command = '/SkipForward';
                await self.sendCommand(command);
            },
        },
        b100_skip_back: {
            name: 'Skip Back',
            description: 'Skip to the previous track',
            options: [],
            callback: async () => {
                const command = '/SkipBack';
                await self.sendCommand(command);
            },
        },
        b100_volumeUp: {
            name: 'Volume Up',
            description: 'Turn the volume up',
            options: [
                {
                    type: 'number',
                    label: 'Volume Change',
                    id: 'volumeChange',
                    default: 3,
                    min: 1,
                    max: 100,
                    step: 1,
                },
            ],
            callback: async (action) => {
                const change = action.options.volumeChange || 3; // Default 3
                const command = `/Volume?db=+${change}`;
                await self.sendCommand(command);
            },
        },
        b100_volumeDown: {
            name: 'Volume Down',
            description: 'Turn the volume down',
            options: [
                {
                    type: 'number',
                    label: 'Volume Change',
                    id: 'volumeChange',
                    default: -3,
                    min: -100,
                    max: -1,
                    step: -1,
                },
            ],
            callback: async (action) => {
                const change = action.options.volumeChange || -3; // Default -3
                const command = `/Volume?db=${change}`;
                await self.sendCommand(command);
            },
        },
    };
}

// New function to register feedback
export function registerBasicFeedbacks(self) {
    self.setFeedbackDefinitions({
        b100_volume_level: {
            type: 'advanced',
            name: 'Volume Level',
            description: 'Displays the current volume level on the button',
            options: [],
            callback: function () {
                return {
                    text: `Volume: ${self.currentVolume || 'N/A'} dB`,
                };
            },
        },
    });
}
