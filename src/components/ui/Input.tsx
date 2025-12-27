"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium text-slate-300 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all",
                            "backdrop-blur-sm",
                            error
                                ? "border-red-500/50 focus:ring-red-500/50"
                                : "border-white/10 focus:ring-blue-500/50 hover:border-white/20",
                            icon && "pl-11",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            {icon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-red-400 text-xs ml-1 animate-pulse">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
