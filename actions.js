import { sendCommand, loadUrl, getSearchResults, parseSearchResults } from './commands.js'

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
        b100_service_search: {
            options: [
                {
                    type: 'dropdown',
                    id: 'service',
                    label: 'Music Service',
                    choices: [
                        { id: 'TIDAL', label: 'Tidal' },
                        { id: 'SPOTIFY', label: 'Spotify' },
                    ],
                    default: 'TIDAL',
                },
                {
                    type: 'textinput',
                    id: 'search_term',
                    label: 'Search Term',
                    default: '',
                },
            ],
            name: 'Service Search',
            callback: async (action) => {
                const service = action.options.service
                const searchTerm = encodeURIComponent(action.options.search_term)

                instance.log('info', `Searching for "${searchTerm}" on ${service}`)

                const url = `/Browse?service=${service}&search=${searchTerm}`

                try {
                    // Send the command and retrieve results
                    const response = await getSearchResults(instance, url)
                    if (response) {
                        instance.searchResults = parseSearchResults(response)

                        instance.log(
                            'info',
                            `Received ${instance.searchResults.length} results`
                        )

                        // Update feedback dropdown with search results
                        instance.setFeedbackOptions(
                            'search_results',
                            instance.searchResults.map((result, index) => ({
                                id: index,
                                label: result.title || result.name, // Adjust to match API response structure
                            }))
                        )
                    }
                } catch (error) {
                    instance.log('error', `Search failed: ${error.message}`)
                }
            },
        },
    }
}
