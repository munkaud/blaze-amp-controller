import {sendCommand, loadUrl, getSearchResults, parseSearchResults} from './commands.js'

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

				await sendCommand(instance, url)
			},
		},
	}
}