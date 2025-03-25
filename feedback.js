export function getFeedbackDefinitions(instance) {
    return {
        search_results: {
            type: 'dropdown',
            name: 'Search Results',
            options: [
                {
                    type: 'dropdown', // or 'number' if it's an index
                    id: 'value',
                    label: 'Select Result',
                    default: 0,
                }
            ],
            
            subscribe: () => {
                if (instance.searchResults && instance.searchResults.length > 0) {
                    instance.setFeedbackOptions(
                        'search_results',
                        instance.searchResults.map((result, index) => ({
                            id: index,
                            label: result.title || result.name // Handle potential missing label
                        }))
                    )
                }
            },
            unsubscribe: () => {
                instance.searchResults = [];
                instance.setFeedbackOptions('search_results', []);
            },
            
            callback: (feedback) => {
                if (instance.searchResults?.length > 0) {
                    const selectedTrack = instance.searchResults[feedback.options.value];
                    return selectedTrack ? { text: selectedTrack } : { text: '' };
                }
                return { text: '' };
            },
            
        },
    }
}