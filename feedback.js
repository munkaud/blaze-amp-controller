export function getFeedbackDefinitions(instance) {
    return {
        search_results: {
            type: 'dropdown',
            name: 'Search Results',
            options: [
                {
                    type: 'number',
                    id: 'value',
                    label: 'Select Result',
                    default: 0,
                }
            ],
            subscribe: () => {
                if (instance.searchResults) {
                    instance.setFeedbackOptions('search_results', instance.searchResults.map((result, index) => ({
                        id: index,
                        label: result.title // or result.name, depending on how the search data is structured
                    })))
                }
            },
            unsubscribe: () => {
                instance.setFeedbackOptions('search_results', [])
            },
            callback: (feedback) => {
                if (instance.searchResults?.length > 0) {
                    const selectedTrack = instance.searchResults?.[feedback.options.value]
                    return selectedTrack ? { text: selectedTrack } : { text: '' }
                }
                return {text: ''}
            },
        },
    }
}