import React from "react";
import OnboardForm from "./onboard-form";
import Affirmations from "./affirmations";

export default function OnboardPage() {
  return (
    <main className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white/80 dark:bg-black/80 border border-neon flex flex-col gap-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-neon text-center mb-2 tracking-wide drop-shadow-neon">Welcome to Vauntico Onboarding</h1>
      <Affirmations />
      <OnboardForm />
    </main>
  );
}
