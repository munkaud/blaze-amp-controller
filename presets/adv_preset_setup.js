// adv_preset_ui.js

export const initAdvancedPresets = {
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
        feedbacks: [],  // To be handled in advanced logic
    },
};
