// Define getSearchResults function directly in adv_preset_logic.js
export async function getSearchResults(self, url, depth = 0) {
    try {
        self.log('debug', `Fetching URL: ${url} at depth ${depth}`);

        const response = await self.fetch(url);
        const responseData = await response.json();

        // Log the response to see the structure
        self.log('debug', `Response at depth ${depth}: ${JSON.stringify(responseData)}`);

        // Check if the response has 'browse' and 'item'
        if (responseData.browse && responseData.browse.item) {
            const items = responseData.browse.item;

            if (items.length > 0) {
                self.log('info', `Received ${items.length} browse items at depth ${depth}`);

                // Return items if found
                return items;
            } else if (depth < 3) { // Limit recursion depth to 3
                // Check for browseKey and recursively call for deeper levels
                for (const item of items) {
                    if (item.$ && item.$.browseKey) {
                        const newUrl = `/Browse?key=${item.$.browseKey}`;
                        self.log('debug', `Navigating deeper into: ${newUrl} at depth ${depth}`);

                        // Recursively call to fetch deeper levels
                        const deeperItems = await getSearchResults(self, newUrl, depth + 1);
                        if (deeperItems) {
                            return deeperItems;
                        }
                    }
                }
            } else {
                // Log when we've reached the max depth
                self.log('warn', `Reached maximum depth of recursion (${depth}) without finding results`);
            }
        } else {
            self.log('warn', `No browse items found at depth ${depth}`);
        }

        // Return null if no results were found after exploring
        return null;
    } catch (error) {
        self.log('error', `Error fetching search results: ${error.message}`);
        return null;
    }
}

// Define advanced preset logic for the B100 player
export function registerAdvancedActions(self) {
    return {
        b100_service_search: async (action) => {
            const service = action.options.service;
            const searchTerm = encodeURIComponent(action.options.search_term);

            if (self.log) {
                self.log('debug', `Search request: ${service} - ${searchTerm}`);
            }

            self.log('info', `Searching for "${searchTerm}" on ${service}`);

            const url = `/Search?service=${service}&query=${searchTerm}`;
            self.log('debug', `Sending search request to: ${url}`);

            try {
                // Call getSearchResults here
                const searchResults = await getSearchResults(self, url);
                if (searchResults && searchResults.length > 0) {
                    self.searchResults = searchResults;
                    
                    self.log('info', `Received ${self.searchResults.length} results`);
                } else {
                    self.searchResults = []; // Ensure it's defined as an empty array
                    self.log('info', 'No results found.');
                }
            } catch (error) {
                self.log('error', `Search failed: ${error.message}`);
                self.searchResults = []; // Handle failure gracefully
            }
        },
    };
}
