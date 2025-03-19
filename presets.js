export function getPresetDefinitions(instance) {
	return {
		play_pause: {
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
							actionId: 'play_pause',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
	}
}