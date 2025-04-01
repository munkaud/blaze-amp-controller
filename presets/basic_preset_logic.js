// Define sendCommand function directly in basic_preset_logic.js
import { parseStringPromise } from 'xml2js';

console.log('parseStringPromise:', parseStringPromise);

export async function sendCommand(self, command) {
    self.log('debug', `self.log is defined: ${typeof self.log}`); 

    try {
        const url = `http://${self.config.host}:${self.config.port}${command}`;
        const response = await fetch(url);

        if (!response.ok) {
            self.log('error', `Failed to send command: ${response.statusText}`);
            return;
        }

        const responseText = await response.text();

        try {
            const jsonResponse = await parseStringPromise(responseText);
            self.log('info', `Received parsed response: ${JSON.stringify(jsonResponse)}`);

            // Handle Volume Response
            if (jsonResponse.volume) {
                const volumeLevel = jsonResponse.volume.$.db;
                self.currentVolume = volumeLevel; // Store volume in instance
                self.checkFeedbacks('b100_volume_level'); // Trigger feedback update
                self.log('info', `Volume set to: ${volumeLevel} dB`);
            
            } else if (jsonResponse.browse && jsonResponse.browse.item) {
                const items = jsonResponse.browse.item;
                items.forEach(item => {
                    self.log('info', `Item: ${JSON.stringify(item)}`);
                });

            } else {
                self.log('error', 'Unexpected response format. Response:', JSON.stringify(jsonResponse));
            }
        } catch (err) {
            self.log('error', `Error parsing XML response: ${err.message}`);
        }
    } catch (err) {
        self.log('error', `Network error: ${err.message}`);
    }
}



// Define basic preset logic for the B100 player
export function registerBasicActions(self) {
    return {
        b100_play_pause: {
            name: 'Play/Pause',
            description: 'Toggle play/pause on the B100',
            options: [],
            callback: async () => {
                const cmd = `/Pause?toggle=1`; // Correct API command
                self.log('debug', `Sending command: ${cmd}`);

                try {
                    await sendCommand(self, cmd);
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
                const command = '/Skip';
                await sendCommand(self, command);
            },
        },
        b100_skip_back: {
            name: 'Skip Back',
            description: 'Skip to the previous track',
            options: [],
            callback: async () => {
                const command = '/Back';
                await sendCommand(self, command);
            },
        },
        b100_volumeUp: {
            name: 'Volume Up',
            description: 'Increase volume by a user-defined step (default: +3 dB)',
            options: [
                {
                    type: 'number',
                    id: 'step',
                    label: 'Volume Step (dB)',
                    default: 3, // Default step is +3 dB
                    min: 1, // Prevents accidental huge jumps
                    max: 20, // Keeps values within reasonable limits
                    step: 1,
                },
            ],
            callback: async (action) => {
                const step = action.options?.step ?? 3; // Ensure a fallback to 3 if undefined
                const command = `/Volume?db=+${step}`;
                await sendCommand(self, command);
            },
        },
        
        b100_volumeDown: {
            name: 'Volume Down',
            description: 'Decrease volume by a user-defined step (default: -3 dB)',
            options: [
                {
                    type: 'number',
                    id: 'step',
                    label: 'Volume Step (dB)',
                    default: 3, // Default step is -3 dB
                    min: 1,
                    max: 20,
                    step: 1,
                },
            ],
            callback: async (action) => {
                const step = action.options?.step ?? 3; // Ensure a fallback to 3 if undefined
                const command = `/Volume?db=-${step}`;
                await sendCommand(self, command);
            },
        },        
        b100_volume_level: {
            type: 'advanced',
            name: 'Volume Level',
            description: 'Displays the current volume level on the button',
            options: [],
            callback: function () {
                return {
                    text: `Volume: ${self.currentVolume || 'N/A'} dB`
                };
            },
        },        
    };
}
