"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/auth-api";
import { User } from "@/services/storage";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isLoading: boolean;
    error: string | null;
    login: (identifier: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Load session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const savedUser = authApi.getSession();
                if (savedUser) {
                    setUser(savedUser);
                }
            } catch (err) {
                console.error("Failed to restore session", err);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Protect Admin Routes
    useEffect(() => {
        if (isLoading) return;
        if (pathname?.startsWith('/admin')) {
            if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
                router.push('/login');
            }
        }
    }, [pathname, user, isLoading, router]);

    const login = async (identifier: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.login(identifier, password);
            if (response.user) {
                setUser(response.user);
                authApi.persistSession(response.user);
                // Redirect based on role
                if (response.user.role === 'SUPER_ADMIN' || response.user.role === 'ADMIN') {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to login");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.register(name, email, password);
            if (response.user) {
                setUser(response.user);
                authApi.persistSession(response.user);
                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "Failed to register");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authApi.logout();
            setUser(null);
            authApi.clearSession();
            router.push("/login");
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
                isSuperAdmin: user?.role === 'SUPER_ADMIN',
                isLoading,
                error,
                login,
                register,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
