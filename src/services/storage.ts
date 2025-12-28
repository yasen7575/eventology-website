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
    id: string;
    name: string;
    email: string;
    password?: string; // Only stored in localStorage for this mock implementation
    role: "user" | "admin" | "super_admin";
    isVerified: boolean;
}

const STORAGE_KEYS = {
    USERS: "eventology_users",
    APPLICATIONS: "eventology_applications",
    INQUIRIES: "eventology_inquiries",
    SETTINGS: "eventology_settings"
};

const SUPER_ADMIN: User = {
    id: "super_admin_001",
    name: "System Administrator",
    email: "ya3777250@gmail.com",
    role: "super_admin",
    isVerified: true
};

const SUPER_ADMIN_PASS = "Ak998877";

export const StorageService = {
    // --- Users ---
    getUsers: (): User[] => {
        if (typeof window === "undefined") return [];
        const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
        return usersStr ? JSON.parse(usersStr) : [];
    },

    saveUser: (user: User) => {
        const users = StorageService.getUsers();
        // Remove existing if any (update)
        const filtered = users.filter(u => u.id !== user.id && u.email !== user.email);
        filtered.push(user);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
    },

    getUserByEmail: (email: string): User | undefined => {
        if (email === SUPER_ADMIN.email) return SUPER_ADMIN;
        const users = StorageService.getUsers();
        return users.find(u => u.email === email);
    },

    // Special Auth Check for Super Admin
    validateCredentials: (email: string, password: string): User | null => {
        if (email === SUPER_ADMIN.email && password === SUPER_ADMIN_PASS) {
            return SUPER_ADMIN;
        }

        const users = StorageService.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        return user || null;
    },

    // --- Applications ---
    getApplications: (): Application[] => {
        if (typeof window === "undefined") return [];
        const appStr = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
        return appStr ? JSON.parse(appStr) : [];
    },

    addApplication: (app: Omit<Application, "id" | "createdAt" | "status">) => {
        const apps = StorageService.getApplications();
        const newApp: Application = {
            ...app,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: "pending"
        };
        apps.push(newApp);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
        return newApp;
    },

    // --- Inquiries ---
    getInquiries: (): Inquiry[] => {
        if (typeof window === "undefined") return [];
        const inqStr = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
        return inqStr ? JSON.parse(inqStr) : [];
    },

    addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => {
        const inquiries = StorageService.getInquiries();
        const newInquiry: Inquiry = {
            ...inquiry,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: "new"
        };
        inquiries.push(newInquiry);
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
        return newInquiry;
    },

    // --- Settings ---
    getSettings: (): SystemSettings => {
        if (typeof window === "undefined") return { formsEnabled: true };
        const settingsStr = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return settingsStr ? JSON.parse(settingsStr) : { formsEnabled: true };
    },

    updateSettings: (settings: Partial<SystemSettings>) => {
        const current = StorageService.getSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
        return updated;
    },

    // --- Utility ---
    wipeAll: () => {
        localStorage.removeItem(STORAGE_KEYS.USERS);
        localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
        localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    }
};
