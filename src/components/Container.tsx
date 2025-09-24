import React from "react";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
      {children}
    </main>
  );
}
