export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

const STORAGE_KEY = "eventology_users";
const SESSION_KEY = "eventology_session";

// Helper to delay execution to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        await delay(1500); // Simulate network request

        // Validation
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        // Get users from storage
        const usersStr = localStorage.getItem(STORAGE_KEY);
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];

        // Find user
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Create session
        const authUser: User = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        // "Token" is just a mock string for now
        const token = "mock-jwt-token-" + Math.random().toString(36).substring(7);

        return { user: authUser, token };
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        await delay(1500);

        // Validation
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        const usersStr = localStorage.getItem(STORAGE_KEY);
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];

        // Check if user exists
        if (users.some((u) => u.email === email)) {
            throw new Error("Email is already registered");
        }

        // Create new user
        const newUser = {
            id: crypto.randomUUID(),
            name,
            email,
            password, // In a real app, this would be hashed!
            createdAt: new Date().toISOString(),
        };

        // Save to storage
        users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        const authUser: User = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };

        const token = "mock-jwt-token-" + Math.random().toString(36).substring(7);

        return { user: authUser, token };
    },

    logout: async (): Promise<void> => {
        await delay(500);
        // In a real app, we might invalidate the token on the server
    },

    // Helper to persist session
    persistSession: (user: User) => {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    },

    getSession: (): User | null => {
        if (typeof window === 'undefined') return null;
        const sessionStr = localStorage.getItem(SESSION_KEY);
        return sessionStr ? JSON.parse(sessionStr) : null;
    },

    clearSession: () => {
        localStorage.removeItem(SESSION_KEY);
    }
};
