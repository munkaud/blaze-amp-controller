// Define the UI for the basic presets
export function initBasicPresets(self) {
    return {
        b100_play_pause: {
            type: 'button',
            category: 'Playback',
            name: 'Play/Pause',
            style: {
                text: 'Play\n/Pause\n⏯️',
                size: '14',
                color: '#FFFFFF',
                bgcolor: '#000000',
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'b100_play_pause',
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
    };
}
