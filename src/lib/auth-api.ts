import { StorageService, User as StorageUser } from "@/services/storage";
import emailjs from '@emailjs/browser';

// Re-export User type to match what AuthContext expects
export interface User extends Omit<StorageUser, "password"> {
    avatar?: string;
}

export interface AuthResponse {
    user: User | null; // User is null if verification is required
    token?: string;
    requiresVerification?: boolean;
    email?: string;
    message?: string;
}

const SESSION_KEY = "eventology_session";
const PENDING_STORAGE_KEY = "eventology_pending_registrations";

// Helper to delay execution to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    login: async (identifier: string, password: string): Promise<AuthResponse> => {
        await delay(1500); // Simulate network request

        // Validation
        if (!identifier || !password) {
            throw new Error("Username/Email and password are required");
        }

        // Use StorageService for centralized logic (handles Super Admin check internally)
        const user = StorageService.validateCredentials(identifier, password);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Double check verification
        if (!user.isVerified) {
            throw new Error("Account not verified.");
        }

        // Create session object (remove password)
        const { password: _, ...safeUser } = user;
        const authUser: User = safeUser;

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

        // Check if user exists in StorageService
        const existingUser = StorageService.getUserByEmail(email);
        if (existingUser) {
            throw new Error("Email already exists");
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
            // Allow registration to proceed in dev even if email fails?
            // For strict requirement, we throw. But maybe we should log it.
            throw new Error("Failed to send verification email. Please try again.");
        }

        // Create new Pending Registration
        const pendingUser = {
            id: crypto.randomUUID(),
            name,
            email,
            password, // Stored temporarily until verification
            otp,
            isVerified: false,
            createdAt: new Date().toISOString(),
        };

        // Save to PENDING storage
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

        // Move to Permanent Storage via StorageService
        const newUser: StorageUser = {
            id: pendingUser.id,
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            role: "user", // Default role
            isVerified: true
        };

        StorageService.saveUser(newUser);

        // Remove from Pending
        pendingUsers.splice(pendingIndex, 1);
        localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingUsers));

        const { password: _, ...safeUser } = newUser;
        const authUser: User = safeUser;
        const token = "mock-jwt-token-" + Math.random().toString(36).substring(7);

        return { user: authUser, token };
    },

    logout: async (): Promise<void> => {
        await delay(500);
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
        StorageService.wipeAll();
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(PENDING_STORAGE_KEY);
    }
};
