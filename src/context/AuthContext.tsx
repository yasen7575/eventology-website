"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi, User } from "@/lib/auth-api";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (identifier: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<{ requiresVerification?: boolean; email?: string }>;
    verify: (email: string, code: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    wipeDatabase: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    const login = async (identifier: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.login(identifier, password);
            if (response.user) {
                setUser(response.user);
                authApi.persistSession(response.user);
                router.push("/");
            }
        } catch (err) {
            const error = err as Error;
            setError(error.message || "Failed to login");
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

            if (response.requiresVerification) {
                // Do NOT set user session yet
                return { requiresVerification: true, email: response.email };
            }

            if (response.user) {
                setUser(response.user);
                authApi.persistSession(response.user);
                router.push("/");
            }
            return {};
        } catch (err) {
            const error = err as Error;
            setError(error.message || "Failed to register");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const verify = async (email: string, code: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.verifyOtp(email, code);
            if (response.user) {
                setUser(response.user);
                authApi.persistSession(response.user);
                router.push("/");
            }
        } catch (err) {
            const error = err as Error;
            setError(error.message || "Verification failed");
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

    const wipeDatabase = () => {
        authApi.wipeDatabase();
        setUser(null);
        router.push("/login");
    }

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                error,
                login,
                register,
                verify,
                logout,
                clearError,
                wipeDatabase
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
