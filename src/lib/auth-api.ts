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
const PENDING_STORAGE_KEY = "eventology_pending_registrations";

// Helper to delay execution to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(): string {
    return crypto.randomUUID();
}

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
        // We first find the user to get their salt
        const user = users.find((u) => u.email === identifier || u.name === identifier);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const salt = user.salt || ""; // Handle legacy users without salt if any (though we assume new DB)
        const passwordHash = await hashPassword(password, salt);

        if (user.password !== passwordHash) {
             throw new Error("Invalid credentials");
        }

        // Double check verification (though only verified users should be in STORAGE_KEY now)
        if (!user.isVerified) {
            throw new Error("Account not verified.");
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

        // Check if user exists in PERMANENT storage
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

        const salt = generateSalt();
        const passwordHash = await hashPassword(password, salt);

        // Create new Pending Registration
        const pendingUser = {
            id: crypto.randomUUID(),
            name,
            email,
            password: passwordHash, // Hashed password
            salt,
            otp,
            isVerified: false,
            createdAt: new Date().toISOString(),
        };

        // Save to PENDING storage (Overwrite existing attempt if exists)
        const pendingStr = localStorage.getItem(PENDING_STORAGE_KEY);
        let pendingUsers: any[] = pendingStr ? JSON.parse(pendingStr) : [];

        // Remove previous attempts for this email
        pendingUsers = pendingUsers.filter(u => u.email !== email);
        pendingUsers.push(pendingUser);

        localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingUsers));

        return {
            user: null,
            requiresVerification: true,
            email: email,
            message: "Verification code sent to your email"
        };
    },

    verifyOtp: async (email: string, code: string): Promise<AuthResponse> => {
        await delay(1000);

        // Check Pending Storage
        const pendingStr = localStorage.getItem(PENDING_STORAGE_KEY);
        let pendingUsers: any[] = pendingStr ? JSON.parse(pendingStr) : [];

        const pendingIndex = pendingUsers.findIndex(u => u.email === email);

        if (pendingIndex === -1) {
            throw new Error("No pending registration found. Please sign up again.");
        }

        const pendingUser = pendingUsers[pendingIndex];

        if (pendingUser.otp !== code) {
            throw new Error("Invalid verification code");
        }

        // Move to Permanent Storage
        const usersStr = localStorage.getItem(STORAGE_KEY);
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];

        // Final check for duplicates (race condition safety)
        if (users.some(u => u.email === email)) {
            throw new Error("User already verified.");
        }

        const newUser = {
            ...pendingUser,
            isVerified: true,
            otp: null
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        // Remove from Pending
        pendingUsers.splice(pendingIndex, 1);
        localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingUsers));

        const authUser: User = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
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
        localStorage.removeItem(PENDING_STORAGE_KEY);
    }
};
