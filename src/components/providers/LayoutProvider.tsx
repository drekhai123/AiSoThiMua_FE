"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

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
    <AuthProvider>
      <CartProvider>
        {!hideLayout && <Navbar />}
        {children}
        {!hideLayout && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
