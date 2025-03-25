export async function sendCommand(instance, command) {
    try {
        const url = `http://${instance.config.host}:${instance.config.port}${command}`
        const response = await fetch(url)
        if (!response.ok) {
            instance.log('error', `Failed to send command: ${response.statusText}`)
        } else {
            instance.log('info', `Command sent successfully: ${command}`)
        }
    } catch (err) {
        instance.log('error', `Network error: ${err.message}`)
    }
}
export async function loadUrl(instance, trackURI, seekTime) {
    if (instance.socket) {
        instance.log('info', `Sending Load URL command: ${trackURI} at ${seekTime}s`)
        const command = `/Play?url=${encodeURIComponent(trackURI)}&seek=${seekTime}`
        instance.socket.send(command)
    } else {
        instance.log('error', 'Socket not connected')
    }
}
export async function getSearchResults(instance) {
    if (instance.socket) {
        instance.socket.send('/Browse');
        instance.socket.on('data', (data) => {
            const response = data.toString();
            instance.log('info', `Received search response: ${response}`);
            // Parse the XML response and store it
            const searchResults = parseSearchResults(response);
            instance.searchResults = searchResults;
        });
    }
}

function parseSearchResults(response) {
    const searchResults = [];
    // Simple XML parsing example (consider adding a library for complex cases)
    const regex = /<name>(.*?)<\/name>/g;
    let match;
    while ((match = regex.exec(response)) !== null) {
        searchResults.push(match[1]);
    }
    return searchResults;
}