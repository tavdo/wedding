"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("არასწორი პაროლი");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0c0b] px-4">
      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-md rounded-sm p-10"
      >
        <h1 className="text-cinematic mb-2 text-center text-3xl text-champagne">
          ადმინ პანელი
        </h1>
        <p className="mb-8 text-center text-sm text-warm-white/50">
          შეიყვანეთ პაროლი შესასვლელად
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="პაროლი"
          className="mb-4 w-full border-b border-warm-white/20 bg-transparent py-3 text-warm-white outline-none focus:border-champagne"
        />

        {error && <p className="mb-4 text-sm text-muted-rose">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-champagne/90 py-3 text-xs uppercase tracking-[0.3em] text-matte-black transition hover:bg-champagne disabled:opacity-50"
        >
          {loading ? "..." : "შესვლა"}
        </button>
      </form>
    </div>
  );
}
