import { db, User } from '@/services/storage';

export interface AuthResponse {
    user: User | null;
    message?: string;
}

const SESSION_KEY = "eventology_session";

// Helper to delay execution to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    login: async (identifier: string, password: string): Promise<AuthResponse> => {
        await delay(800);

        const user = db.findUser(identifier);

        if (!user || user.password !== password) {
            throw new Error("Invalid credentials");
        }

        // Create session object (remove password)
        const sessionUser = { ...user };
        delete sessionUser.password;

        return { user: sessionUser };
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        await delay(800);

        if (db.findUser(email)) {
            throw new Error("User already exists");
        }

        const newUser = db.createUser({
            name,
            email,
            password,
            role: 'USER', // Default role
        });

        const sessionUser = { ...newUser };
        delete sessionUser.password;

        return { user: sessionUser };
    },

    logout: async (): Promise<void> => {
        await delay(500);
    },

    persistSession: (user: User) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        }
    },

    getSession: (): User | null => {
        if (typeof window === 'undefined') return null;
        const sessionStr = localStorage.getItem(SESSION_KEY);
        return sessionStr ? JSON.parse(sessionStr) : null;
    },

    clearSession: () => {
        localStorage.removeItem(SESSION_KEY);
    },

    // For legacy compatibility if needed
    wipeDatabase: () => {
        localStorage.clear();
    }
};
