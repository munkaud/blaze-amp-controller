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

            if (jsonResponse && jsonResponse.browse && jsonResponse.browse.item) {
                const items = jsonResponse.browse.item;

                items.forEach(item => {
                    self.log('info', `Item: ${JSON.stringify(item)}`);
                });
            } else {
                self.log('error', 'No browse items found in the response.');
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
        b100_play_pause: async () => {
            const command = '/PlayPause';
            await sendCommand(self, command);
        },
        b100_skip_forward: async () => {
            const command = '/SkipForward';
            await sendCommand(self, command);
        },
        b100_skip_back: async () => {
            const command = '/SkipBack';
            await sendCommand(self, command);
        },
    };
}
