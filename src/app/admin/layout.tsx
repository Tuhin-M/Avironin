"use client";

import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="admin-layout">
        {children}
      </div>
    </AuthProvider>
  );
}
