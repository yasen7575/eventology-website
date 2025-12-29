// src/services/storage.ts

export interface Application {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: "beginner" | "expert";
    university?: string;
    age?: string;
    motivation?: string;
    specialty?: string;
    portfolio?: string;
    experience?: string;
    createdAt: string;
    status: "pending" | "reviewed" | "accepted" | "rejected";
}

export interface Inquiry {
    id: string;
    name: string;
    company: string;
    email: string;
    message: string;
    createdAt: string;
    status: "new" | "read";
}

export interface SystemSettings {
    formsEnabled: boolean;
}

export interface User {
    id:string;
    name: string;
    email: string;
    password?: string;
    role: "user" | "admin" | "super_admin";
    isVerified: boolean;
    permissions?: string[];
}

async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`/api${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    if (!response.ok) {
        const error = new Error(`API error: ${response.statusText}`);
        try {
            const body = await response.json();
            (error as any).responseBody = body;
        } catch (e) {
            // Ignore if body is not JSON
        }
        throw error;
    }
    return response.json();
}

export const StorageService = {
    // --- Users ---
    getUsers: (): Promise<User[]> => api<User[]>('/users'),

    saveUser: (user: Omit<User, 'id' | 'isVerified' | 'role'>): Promise<User> => api<User>('/users', {
        method: 'POST',
        body: JSON.stringify({
            ...user,
            id: crypto.randomUUID(),
            isVerified: false, // Or handle verification flow
            role: 'user',
        }),
    }),

    promoteUser: (userId: string): Promise<User> => api<User>(`/users/${userId}/promote`, { method: 'POST' }),

    demoteUser: (userId: string): Promise<User> => api<User>(`/users/${userId}/demote`, { method: 'POST' }),

    getUserByEmail: async (email: string): Promise<User | undefined> => {
        const users = await StorageService.getUsers();
        return users.find(u => u.email === email);
    },

    // --- Applications ---
    getApplications: (): Promise<Application[]> => api<Application[]>('/applications'),

    addApplication: (app: Omit<Application, "id" | "createdAt" | "status">): Promise<Application> => api<Application>('/applications', {
        method: 'POST',
        body: JSON.stringify(app),
    }),

    // --- Inquiries ---
    getInquiries: (): Promise<Inquiry[]> => api<Inquiry[]>('/inquiries'),

    addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">): Promise<Inquiry> => api<Inquiry>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(inquiry),
    }),

    // --- Settings ---
    getSettings: (): Promise<SystemSettings> => api<SystemSettings>('/settings'),

    updateSettings: (settings: Partial<SystemSettings>): Promise<SystemSettings> => api<SystemSettings>('/settings', {
        method: 'POST',
        body: JSON.stringify(settings),
    }),

    // --- Utility ---
    wipeAll: (): Promise<void> => api<void>('/wipe', { method: 'POST' }), // Assumes a /api/wipe endpoint
};
