const CONFIG = {
    // Default to localhost, but allow override from localStorage
    API_BASE_URL: localStorage.getItem('api_base_url') || 'http://localhost:3000',

    // Helper to get full API URL
    getApiUrl: (endpoint) => {
        return `${CONFIG.API_BASE_URL}${endpoint}`;
    }
};
