export function getPresetDefinitions(instance) {
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
		b100_service_search: {
			type: 'button',
			category: 'Playback',
			name: 'Search and Play Track',
			style: {
				text: 'Search & \n Play',
				size: '14',
				color: '#FFFFFF',
				bgcolor: '#000000',
			},
			options:[
				{
					type: 'dropdown',
					id: 'service',
					label: 'Music Service',
					tooltip: 'Select music service',
					choices: [
						{ id: 'TIDAL', label: 'Tidal' },
						{ id: 'SPOTIFY', label: 'Spotify' },
						// Add more services if available
					],
					default: 'TIDAL',
				},
				{
					type: 'textinput',
					id: 'search_term',
					label: 'Search Term',
					tooltip: 'Enter artist, album, or track name',
					default: '',
					useVariables: true,
				},
			],
			steps: [
				{
					down: [
						{
							actionId: 'b100_service_search',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		
	}
}