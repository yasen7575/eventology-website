"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

export default function WipeDb() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "wiping" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleWipe = () => {
        setStatus("wiping");
        try {
            if (typeof window !== "undefined") {
                // FORCE CLEAR ALL KEYS
                localStorage.removeItem("eventology_users");
                localStorage.removeItem("eventology_session");
                localStorage.removeItem("eventology_pending_registrations");

                // Double check they are gone
                const users = localStorage.getItem("eventology_users");
                if (users) throw new Error("Failed to delete users key");

                setStatus("success");
                setMessage("All data erased successfully.");

                setTimeout(() => {
                    router.push("/signup");
                }, 2000);
            }
        } catch (error: any) {
            setStatus("error");
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Trash2 className="text-red-500" size={32} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold mb-2">Wipe Database</h1>
                    <p className="text-slate-400">
                        This will permanently delete all users and sessions from your local browser storage.
                    </p>
                </div>

                {status === "idle" && (
                    <button
                        onClick={handleWipe}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-95"
                    >
                        Wipe My Data Now
                    </button>
                )}

                {status === "success" && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-center justify-center gap-2">
                        <CheckCircle size={20} />
                        <span>{message}</span>
                    </div>
                )}

                {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center justify-center gap-2">
                        <XCircle size={20} />
                        <span>{message}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
