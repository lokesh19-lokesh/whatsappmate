const Auth = {
    // --- State ---
    token: localStorage.getItem('auth_token'),
    user: JSON.parse(localStorage.getItem('auth_user') || '{}'),

    // --- Actions ---
    login: async (email, password) => {
        // --- MOCK LOGIN ---
        console.log("Mock Login Active");

        // Simulating network delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create dummy auth headers
        const authHeaders = {
            'access-token': 'mock-access-token',
            'client': 'mock-client-id',
            'uid': email,
            'expiry': (Date.now() + 86400000).toString(), // +24 hours
            'token-type': 'Bearer'
        };

        localStorage.setItem('auth_headers', JSON.stringify(authHeaders));

        // Create dummy user data
        const userData = {
            id: 1,
            name: 'Demo Admin',
            email: email,
            role: 'admin',
            avatar_url: ''
        };

        localStorage.setItem('auth_user', JSON.stringify(userData));
        Auth.user = userData;

        window.location.href = 'dashboard.html';
        return { success: true };
    },

    logout: () => {
        localStorage.removeItem('auth_headers');
        localStorage.removeItem('auth_user');
        window.location.href = 'login.html';
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('auth_headers');
    },

    // Get headers for authenticated requests
    getAuthHeaders: () => {
        const headers = localStorage.getItem('auth_headers');
        return headers ? JSON.parse(headers) : {};
    },

    // Check auth on protected pages
    checkAuth: () => {
        if (!Auth.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }
};
