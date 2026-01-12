"use client";

import AdminSidebar from './AdminSidebar';
import AdminGuard from './AdminGuard';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="ml-64 min-h-screen">
          {/* Top Bar */}
          {(title || subtitle) && (
            <header className="bg-white border-b border-gray-200 px-8 py-6">
              {title && <h1 className="text-2xl font-bold text-charcoal">{title}</h1>}
              {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
            </header>
          )}
          
          {/* Page Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
