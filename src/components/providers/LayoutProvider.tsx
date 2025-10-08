"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Các trang không hiển thị Navbar và Footer
  const hideLayout = pathname === "/login" || pathname === "/register" || 
                     pathname === "/verify-otp" || pathname === "/reset-password"
                     || pathname === "/forgot-password";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
