import React from "react";
import DashboardTable from "./dashboard-table";

export const metadata = {
  title: "Contributor Dashboard | Vauntico",
  description: "View your submitted products, onboarding status, and spiritual affirmations.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black/90 dark:bg-black text-white px-4 py-12 animate-fade-in">
      <div className="w-full max-w-4xl bg-black/80 border border-neon rounded-2xl shadow-2xl p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold text-neon text-center drop-shadow-neon mb-2 tracking-wide">Contributor Command Center</h1>
        <p className="text-center text-lg text-white/80 mb-6">Welcome to your spiritual dashboard. Here you can track your product submissions, onboarding status, and receive affirmations to guide your journey.</p>
        <DashboardTable />
      </div>
    </main>
  );
}
