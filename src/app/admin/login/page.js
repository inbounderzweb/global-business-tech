"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const year = useMemo(() => new Date().getFullYear(), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (username === "admin" && password === "password123") {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("adminAuth", "true");
                document.cookie = "adminAuth=true; path=/; max-age=86400; SameSite=Lax";
            }
            router.push("/admin/dashboard");
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue-200/40 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.18]" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-40px_rgba(2,6,23,0.35)] ring-1 ring-slate-200 lg:grid-cols-2">
                    {/* LEFT */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1b3856] to-[#366da4]" />
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#60A5FA_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#22C55E_0%,transparent_38%),radial-gradient(circle_at_50%_80%,#A78BFA_0%,transparent_40%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />

                        <div className="relative flex h-full flex-col justify-between p-10 text-white">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                                        <div className="h-5 w-5 rounded-lg bg-white/90" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80">Admin Portal</p>
                                        <h1 className="text-xl font-semibold tracking-wide">Inbounderz</h1>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h2 className="text-3xl font-semibold leading-tight">
                                        Secure access for <br /> your team dashboard
                                    </h2>
                                    <p className="mt-4 text-white/75 leading-relaxed">
                                        Sign in to manage content, products, blogs, orders and customers.
                                    </p>

                                    <div className="mt-8 grid gap-4">
                                        <Feature title="Products & Variations" sub="Create, tag & manage pricing" />
                                        <Feature title="Blog publishing" sub="Images, quotes, author & dates" />
                                        <Feature title="Orders & customers" sub="View activity and manage workflow" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-white/60">
                                <span>© {year} Inbounderz</span>
                                <span className="hidden xl:inline">Designed for global business tech</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="p-7 sm:p-10 lg:p-12">
                        <div className="mx-auto max-w-md">
                            <div className="mb-6">
                                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Admin Login</h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    Enter your credentials to continue.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Field label="Username" icon={<UserIcon />}>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-slate-900 shadow-sm outline-none transition focus:border-[#366da4] focus:ring-4 focus:ring-blue-100"
                                        placeholder="Enter username"
                                        required
                                    />
                                </Field>

                                <Field label="Password" icon={<LockIcon />}>
                                    <input
                                        id="password"
                                        type={showPass ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 pr-24 text-slate-900 shadow-sm outline-none transition focus:border-[#366da4] focus:ring-4 focus:ring-blue-100"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((v) => !v)}
                                        className="absolute inset-y-0 right-3 my-auto h-9 rounded-xl px-3 text-xs font-medium text-slate-600 hover:bg-slate-100"
                                    >
                                        {showPass ? "Hide" : "Show"}
                                    </button>
                                </Field>

                                <button
                                    type="submit"
                                    className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#366da4] to-[#366da4] px-4 py-3 text-white shadow-[0_14px_30px_-18px_rgba(54,109,164,0.75)] transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                                        Login <ArrowIcon />
                                    </span>
                                </button>
                            </form>

                            <div className="mt-6 text-center text-xs text-slate-500">
                                By continuing you agree to internal admin access policies.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* UI bits */
function Field({ label, icon, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
            <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    {icon}
                </span>
                {children}
            </div>
        </div>
    );
}

function Feature({ title, sub }) {
    return (
        <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 rounded-xl bg-white/15 flex items-center justify-center ring-1 ring-white/10">
                    <div className="h-3 w-3 rounded-md bg-white/80" />
                </div>
                <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-xs text-white/70">{sub}</p>
                </div>
            </div>
        </div>
    );
}

function UserIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M20 20.5c0-4.142-3.582-7.5-8-7.5s-8 3.358-8 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M7.5 10V8.2A4.5 4.5 0 0 1 12 3.7a4.5 4.5 0 0 1 4.5 4.5V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M6.5 10h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M5 12h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}