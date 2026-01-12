"use client";

import { usePathname } from 'next/navigation';
import AvHeader from "@/components/layout/AvHeader";
import AvFooter from "@/components/layout/AvFooter";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className={isAdminRoute ? '' : 'pt-[104px]'}>
        {!isAdminRoute && <AvHeader />}
        <main className="flex-grow">
          {children}
        </main>
        {!isAdminRoute && <AvFooter />}
      </div>
    </AuthProvider>
  );
}
