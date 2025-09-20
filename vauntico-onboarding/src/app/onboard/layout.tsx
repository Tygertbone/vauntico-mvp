import React from "react";

export default function OnboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
