"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAdminRole();
  }, []);

  const checkAdminRole = () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        // Not logged in - redirect to login with return URL
        router.replace("/login?redirect=/aduconcachienxu");
        return;
      }

      // Parse user data
      const user = JSON.parse(userStr);

      // Check if user has admin role
      if (user.role !== "admin") {
        // Not admin - show unauthorized and redirect
        setIsAuthorized(false);
        setTimeout(() => {
          router.replace("/");
        }, 2000);
        return;
      }

      // User is admin - allow access
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error checking admin role:", error);
      router.replace("/login");
    } finally {
      setIsChecking(false);
    }
  };

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Đang xác thực quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="text-center max-w-md">
          <div className="bg-red-500/10 border border-red-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Truy cập bị từ chối
          </h1>
          <p className="text-gray-400 mb-4">
            Bạn không có quyền truy cập vào khu vực quản trị.
            <br />
            Đang chuyển hướng về trang chủ...
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  // Render children if authorized
  return <>{children}</>;
}
