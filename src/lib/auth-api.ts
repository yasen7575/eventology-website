import emailjs from '@emailjs/browser';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
}

export interface AuthResponse {
    user: User | null; // User is null if verification is required
    token?: string;
    requiresVerification?: boolean;
    email?: string;
    message?: string;
}

const STORAGE_KEY = "eventology_users";
const SESSION_KEY = "eventology_session";

// Helper to delay execution to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    login: async (identifier: string, password: string): Promise<AuthResponse> => {
        await delay(1500); // Simulate network request

        // Validation
        if (!identifier || !password) {
            throw new Error("Username/Email and password are required");
        }

        // Get users from storage
        const usersStr = localStorage.getItem(STORAGE_KEY);
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];

        // Find user by Email OR Name
        const user = users.find((u) => 
            (u.email === identifier || u.name === identifier) && u.password === password
        );

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (!user.isVerified) {
            throw new Error("Account not verified. Please check your email for the code.");
        }

        // Create session
        const authUser: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: true
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
        if (users.some((u) => u.email === email || u.name === name)) {
            throw new Error("Email or Username already exists");
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Send OTP via EmailJS
        try {
            await emailjs.send(
                "service_eprnvim",
                "template_wr5ios5",
                { 
                    otp: otp, 
                    user_email: email 
                },
                "ivm-LYIlxfzPm0nFk"
            );
        } catch (error) {
            console.error("EmailJS Error:", error);
            throw new Error("Failed to send verification email. Please try again.");
        }

        // Create new user (Unverified)
        const newUser = {
            id: crypto.randomUUID(),
            name,
            email,
            password, // In a real app, this would be hashed!
            otp,
            isVerified: false,
            createdAt: new Date().toISOString(),
        };

        // Save to storage
        users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        return { 
            user: null, 
            requiresVerification: true,
            email: email,
            message: "Verification code sent to your email" 
        };
    },

    verifyOtp: async (email: string, code: string): Promise<AuthResponse> => {
        await delay(1000);

         const usersStr = localStorage.getItem(STORAGE_KEY);
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];
        
        const userIndex = users.findIndex(u => u.email === email);
        
        if (userIndex === -1) {
             throw new Error("User not found");
        }

        const user = users[userIndex];

        if (user.otp !== code) {
            throw new Error("Invalid verification code");
        }

        // Update user to verified
        users[userIndex].isVerified = true;
        users[userIndex].otp = null; // Clear OTP
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        const authUser: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: true
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
    },

    // Utility to wipe database for testing
    wipeDatabase: () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SESSION_KEY);
    }
};
