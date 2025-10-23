"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  CreditCard,
  MessageSquare,
  Globe,
  Newspaper,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/aduconcachienxu",
  },
  {
    title: "Quản lý Users",
    icon: Users,
    href: "/aduconcachienxu/users",
  },
  {
    title: "Quản lý Sản phẩm",
    icon: Package,
    href: "/aduconcachienxu/products",
  },
  {
    title: "Quản lý Orders",
    icon: ShoppingBag,
    href: "/aduconcachienxu/orders",
  },
  {
    title: "Quản lý Nạp tiền",
    icon: CreditCard,
    href: "/aduconcachienxu/transactions",
  },
  {
    title: "Tin nhắn Khách hàng",
    icon: MessageSquare,
    href: "/aduconcachienxu/contacts",
  },
  {
    title: "Thiết kế Website",
    icon: Globe,
    href: "/aduconcachienxu/website-requests",
  },
  {
    title: "Quản lý Tin tức",
    icon: Newspaper,
    href: "/aduconcachienxu/news",
  },
  {
    title: "Cài đặt",
    icon: Settings,
    href: "/aduconcachienxu/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-xl font-bold text-white">ASTM Admin</h1>
        <p className="text-sm text-neutral-400 mt-1">Quản trị hệ thống</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info & Logout */}
      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-neutral-400">admin@astm.com</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
