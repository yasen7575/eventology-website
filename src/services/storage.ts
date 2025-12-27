
// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  password?: string; // Optional for session objects, required for DB
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'archived';
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;

  // Unified Schema Fields
  specialty: string;           // Renamed from expertise
  university?: string;         // New: Education
  age?: string;                // New: Demographics
  motivation?: string;         // New: Why join?
  portfolio?: string;          // New: Links
  experience?: string;         // New: Detailed text description

  experienceLevel?: 'Entry' | 'Mid' | 'Senior'; // Optional now (legacy/pipeline specific)

  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
  timestamp: string;
}

export interface SystemSettings {
  pipelineOpen: boolean;
}

// Storage Keys
const KEYS = {
  USERS: 'eventology_users',
  INQUIRIES: 'eventology_inquiries',
  APPLICATIONS: 'eventology_applications',
  SETTINGS: 'eventology_settings',
};

// Seed Data
const DEFAULT_SETTINGS: SystemSettings = {
  pipelineOpen: true,
};

const SUPER_ADMIN: User = {
  id: 'admin-001',
  email: 'ya3777250@gmail.com',
  name: 'System Commander',
  role: 'SUPER_ADMIN',
  password: 'admin', // Default password
};

class StorageService {
  private isClient: boolean = typeof window !== 'undefined';

  constructor() {
    if (this.isClient) {
      this.init();
    }
  }

  private init() {
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    // Ensure Super Admin always exists
    const users = this.getUsers();
    if (!users.find(u => u.email === SUPER_ADMIN.email)) {
      users.push(SUPER_ADMIN);
      this.saveUsers(users);
    }
  }

  // --- Users ---
  getUsers(): User[] {
    if (!this.isClient) return [];
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  }

  saveUsers(users: User[]) {
    if (this.isClient) localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  }

  findUser(email: string): User | undefined {
    return this.getUsers().find(u => u.email === email);
  }

  createUser(user: Omit<User, 'id'>) {
    const users = this.getUsers();
    const newUser = { ...user, id: crypto.randomUUID() };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  updateUserRole(userId: string, newRole: 'ADMIN' | 'USER') {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      if (users[index].role === 'SUPER_ADMIN') return null; // Cannot change super admin
      users[index].role = newRole;
      this.saveUsers(users);
      return users[index];
    }
    return null;
  }

  // --- Inquiries ---
  getInquiries(): Inquiry[] {
    if (!this.isClient) return [];
    const data = localStorage.getItem(KEYS.INQUIRIES);
    return data ? JSON.parse(data) : [];
  }

  addInquiry(inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    inquiries.unshift(newInquiry);
    if (this.isClient) localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  }

  // --- Applications ---
  getApplications(): Application[] {
    if (!this.isClient) return [];
    const data = localStorage.getItem(KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  }

  addApplication(app: Omit<Application, 'id' | 'timestamp' | 'status'>) {
    const apps = this.getApplications();
    const newApp: Application = {
      ...app,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    apps.unshift(newApp);
    if (this.isClient) localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    return newApp;
  }

  updateApplicationStatus(id: string, status: Application['status']) {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === id);
    if (index !== -1) {
      apps[index].status = status;
      if (this.isClient) localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
      return apps[index];
    }
    return null;
  }

  // --- Settings ---
  getSettings(): SystemSettings {
    if (!this.isClient) return DEFAULT_SETTINGS;
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  }

  updateSettings(settings: Partial<SystemSettings>) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    if (this.isClient) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }
}

export const db = new StorageService();
