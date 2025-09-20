"use client";
import React, { useState } from "react";

export default function OnboardForm() {
  const [form, setForm] = useState({ name: "", email: "", productTheme: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [quote, setQuote] = useState("");

  function generateAffirmation(theme: string) {
    const base = [
      `Your journey in ${theme} is a sacred act of creation.`,
      `You are a vessel for premium ${theme} experiences.`,
      `The spirit of ${theme} flows through your intention.`,
      `You are aligned with the higher purpose of ${theme}.`,
      `Your light elevates the Vauntico mission in ${theme}.`,
      `Welcome, ${theme} visionary—your presence is a blessing!`,
      `May your work in ${theme} inspire and uplift all beings.`,
      `You are now part of a spiritual movement in ${theme}.`,
    ];
    // fallback if theme is empty
    if (!theme.trim()) {
      return "You are a sacred creator. Welcome!";
    }
    return base[Math.floor(Math.random() * base.length)];
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setQuote("");
    // Validate fields
    if (!form.name || !form.email || !form.productTheme) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          productTheme: form.productTheme,
        }),
      });
      if (!res.ok) throw new Error("Onboarding failed. Please try again.");
  setSuccess(true);
  setQuote(generateAffirmation(form.productTheme));
  setForm({ name: "", email: "", productTheme: "" });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-black/70 dark:bg-black/80 p-6 rounded-xl border border-neon shadow-xl animate-fade-in"
    >
      <input
        className="bg-gray-900 border border-neon rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon text-white placeholder:text-gray-400"
        placeholder="Your Name"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        required
      />
      <input
        className="bg-gray-900 border border-neon rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon text-white placeholder:text-gray-400"
        placeholder="Email Address"
        type="email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        required
      />
      <input
        className="bg-gray-900 border border-neon rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon text-white placeholder:text-gray-400"
        placeholder="Product Theme (e.g. Mindful Tech)"
        value={form.productTheme}
        onChange={e => setForm(f => ({ ...f, productTheme: e.target.value }))}
        required
      />
      <button
        type="submit"
        className="bg-neon text-black font-bold py-2 rounded shadow-lg hover:bg-white hover:text-neon transition-colors disabled:opacity-60 border border-neon"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-neon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Initiating…
          </span>
        ) : (
          "Begin Sacred Onboarding"
        )}
      </button>
      {error && <div className="text-neon text-sm text-center mt-2">{error}</div>}
      {success && (
        <div className="flex flex-col items-center justify-center mt-4 animate-fade-in">
          <div className="relative flex items-center justify-center mb-2">
            <span className="absolute inline-block w-20 h-20 rounded-full bg-neon opacity-30 blur-xl animate-pulse-glow" />
            <span className="relative z-10 text-neon text-3xl font-extrabold drop-shadow-neon animate-fade-in">✦</span>
          </div>
          <div className="text-neon text-lg font-semibold mb-2 animate-fade-in-slow">{quote}</div>
          <div className="text-base text-white/90 animate-fade-in-slow">Welcome! Check your email for next steps.</div>
        </div>
      )}
    </form>
  );
}
