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
		b100_track_seek: {
			type: 'button',
			category: 'Playback',
			name: 'Play Specific Track',
			style: {
				text: 'Track & \n Time',
				size: '14',
				color: '#FFFFFF',
				bgcolor: '#000000',
			},
			options:[
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
					step: 1, // <- Added this to ensure proper handling of numeric input
				}
			],
			steps: [
				{
					down: [
						{
							actionId: 'b100_track_seek',
							options: {
								track_uri: '', // <- Pull from button setup
								seek_time: 0   // <- Pull from button setup
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		
	}
}