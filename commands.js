import { parseStringPromise } from 'xml2js';

export async function sendCommand(instance, command) {
    try {
        const url = `http://${instance.config.host}:${instance.config.port}${command}`;
        const response = await fetch(url);

        if (!response.ok) {
            instance.log('error', `Failed to send command: ${response.statusText}`);
            return;
        }

        const responseText = await response.text();

        try {
            const jsonResponse = await parseStringPromise(responseText);
            instance.log('info', `Received parsed response: ${JSON.stringify(jsonResponse)}`);

            if (jsonResponse && jsonResponse.browse && jsonResponse.browse.item) {
                const items = jsonResponse.browse.item;

                items.forEach(item => {
                    instance.log('info', `Item: ${JSON.stringify(item)}`);
                });

                // Expand the browseKey further if necessary
                const tidals = items.filter(item => item.$.browseKey && item.$.browseKey.startsWith('Tidal'));

                if (tidals.length > 0) {
                    const firstTidal = tidals[0];
                    const tidalBrowseKey = firstTidal.$.browseKey;
                    instance.log('info', `TIDAL browseKey: ${tidalBrowseKey}`);

                    // Attempt to retrieve more detailed data for TIDAL
                    if (tidalBrowseKey === 'Tidal:') {
                        // If browseKey matches, let's attempt to request detailed track info
                        await sendCommand(instance, `/Browse?browseKey=${tidalBrowseKey}&detailed=true`);
                    } else {
                        instance.log('error', 'No valid TIDAL tracks found.');
                    }
                } else {
                    instance.log('error', 'No TIDAL tracks found in the search results.');
                }
            } else {
                instance.log('error', 'No browse items found in the response.');
            }
        } catch (err) {
            instance.log('error', `Error parsing XML response: ${err.message}`);
        }
    } catch (err) {
        instance.log('error', `Network error: ${err.message}`);
    }
}



export async function loadUrl(instance, trackURI, seekTime) {
    if (instance.socket) {
        instance.log('info', `Sending Load URL command: ${trackURI} at ${seekTime}s`)
        const command = `/Play?url=${encodeURIComponent(trackURI)}&seek=${seekTime}`
        instance.socket.fetch(command)
    } else {
        instance.log('error', 'Socket not connected')
    }
}
export async function getSearchResults(instance, url) {
    try {
        const response = await sendCommand(instance, url)
        if (!response || typeof response !== 'string') {
            throw new Error('Invalid response from Bluesound API')
        }
        return response
    } catch (error) {
        instance.log('error', `Failed to fetch search results: ${error.message}`)
        return null
    }
}


export function parseSearchResults(response) {
    try {
        const data = JSON.parse(response)
        if (!data || !data.items) return []
        return data.items.map((item) => ({
            title: item.title || 'Unknown Title',
            id: item.id || null,
        }))
    } catch (error) {
        console.error('Failed to parse search results:', error)
        return []
    }
}
