import { AuthChangeEvent, Session } from '@supabase/supabase-js';

const getStoredSession = (): Session | null => {
    if (typeof window === 'undefined') return null;
    const saved = window.sessionStorage.getItem('supabase-mock-session');
    return saved ? JSON.parse(saved) : null;
};

const saveSession = (session: Session | null) => {
    if (typeof window === 'undefined') return;
    if (session) {
        window.sessionStorage.setItem('supabase-mock-session', JSON.stringify(session));
    } else {
        window.sessionStorage.removeItem('supabase-mock-session');
    }
};

let currentSession: Session | null = getStoredSession();

export const mockBrowserClient = {
    auth: {
        getSession: async () => ({ data: { session: currentSession }, error: null }),
        onAuthStateChange: (cb: (event: AuthChangeEvent, session: Session | null) => void) => {
            // Immediately trigger current state
            cb('SIGNED_IN', currentSession);
            return { data: { subscription: { unsubscribe: () => { } } } };
        },
        signInWithPassword: async (creds: { email: string }) => {
            currentSession = {
                user: { id: 'mock-user', email: creds.email },
                access_token: 'mock', refresh_token: 'mock', expires_in: 3600, token_type: 'bearer'
            } as Session;
            saveSession(currentSession);
            return { data: { session: currentSession }, error: null };
        },
        signUp: async (creds: { email: string }) => {
            currentSession = {
                user: { id: 'mock-user', email: creds.email },
                access_token: 'mock', refresh_token: 'mock', expires_in: 3600, token_type: 'bearer'
            } as Session;
            saveSession(currentSession);
            return { data: { session: currentSession }, error: null };
        },
        signOut: async () => {
            currentSession = null;
            saveSession(null);
        },
    },
    from: (table: string) => {
        return {
            select: () => ({
                eq: () => ({
                    single: async () => {
                        if (table === 'profiles') return { data: { full_name: 'Mock Admin' }, error: null };
                        return { data: null, error: null };
                    },
                    maybeSingle: async () => ({ data: null, error: null }),
                })
            }),
        };
    },
};
