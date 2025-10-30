"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/guards/AdminGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isContactsPage = pathname === "/aduconcachienxu/contacts";

  return (
    <AdminGuard>
      <div className="flex h-screen bg-neutral-950">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className={isContactsPage ? "" : "p-8"}>
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
