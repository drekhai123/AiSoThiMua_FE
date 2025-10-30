"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Settings, ShoppingBag, Heart, ChevronDown, Bell, ShoppingCart, Trash2, Plus, Minus, FileText, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { getCategories } from "@/services/category.service";
import type { Category } from "@/types/models/category.model";

// Mock notifications data
const MOCK_NOTIFICATIONS = [
    {
        id: "1",
        title: "Đơn hàng thành công",
        message: "Đơn hàng #ORD-2024-001 của bạn đã được xử lý thành công",
        time: "5 phút trước",
        read: false,
        type: "success"
    },
    {
        id: "2",
        title: "Nạp tiền thành công",
        message: "Bạn đã nạp thành công 500 Cá vào ví",
        time: "1 giờ trước",
        read: false,
        type: "info"
    },
    {
        id: "3",
        title: "Khuyến mãi mới",
        message: "Giảm 20% cho đơn hàng từ 500 Cá. Áp dụng đến 31/12",
        time: "2 giờ trước",
        read: true,
        type: "promotion"
    },
    {
        id: "4",
        title: "Sản phẩm mới",
        message: "ChatGPT Pro đã có mặt trên hệ thống",
        time: "1 ngày trước",
        read: true,
        type: "info"
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();
    const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, showAddToCartAnimation } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
    const productsMenuTimer = useRef<NodeJS.Timeout | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const productsMenuRef = useRef<HTMLDivElement>(null);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories({ includeInactive: false });
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
            if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
                setIsProductsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "success": return "🎉";
            case "info": return "ℹ️";
            case "promotion": return "🎁";
            default: return "🔔";
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-l from-purple-600 to-blue-600 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="relative flex items-center space-x-2 group"
                    aria-label="Trang chủ"
                >
                    <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                        <Image
                            src="/logos/ASTM.svg"
                            alt="ASTM Logo"
                            width={160}
                            height={40}
                            quality={100}
                            priority
                            className="transition-all duration-300 group-hover:brightness-110"
                        />
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 blur-xl bg-purple-400/20"></div>
                        </div>
                    </div>
                </Link>
                {/* Menu Navigation */}
                <div className="hidden md:flex space-x-8">
                    <Link
                        href="/"
                        className={`relative text-white hover:text-purple-200 transition-all py-2 group ${pathname === "/" ? "font-semibold" : ""
                            }`}
                    >
                        Trang chủ
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}></span>
                    </Link>
                    {/* Products with dropdown */}
                    <div
                        className="relative"
                        ref={productsMenuRef}
                        onMouseEnter={() => {
                            if (productsMenuTimer.current) {
                                clearTimeout(productsMenuTimer.current);
                            }
                            setIsProductsMenuOpen(true);
                        }}
                        onMouseLeave={() => {
                            productsMenuTimer.current = setTimeout(() => {
                                setIsProductsMenuOpen(false);
                            }, 150);
                        }}
                    >
                        <Link
                            href="/products"
                            className={`relative text-white hover:text-purple-200 transition-all py-2 group flex items-center gap-1 ${pathname === "/products" || pathname?.startsWith("/products/") ? "font-semibold" : ""
                                }`}
                        >
                            Sản phẩm
                            <ChevronDown className={`w-4 h-4 transition-transform ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${pathname === "/products" || pathname?.startsWith("/products/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`}></span>
                        </Link>

                        {/* Categories Dropdown */}
                        {isProductsMenuOpen && categories.length > 0 && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[900px]">
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
                                    <div className="p-6">
                                        {/* Header with All Products Button */}
                                        <div className="mb-6">
                                            <Link
                                                href="/products"
                                                className="block px-6 py-4 text-white font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 rounded-xl transition-all text-center shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] group"
                                            >
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="text-2xl group-hover:rotate-12 transition-transform">🛒</span>
                                                    <span>Xem tất cả sản phẩm</span>
                                                </span>
                                            </Link>
                                        </div>

                                        {/* Categories Grid */}
                                        <div className="mb-3">
                                            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3 px-2">
                                                Danh mục sản phẩm
                                            </h3>
                                            <div className="grid grid-cols-4 gap-4">
                                                {categories.map((category) => (
                                                    <Link
                                                        key={category.id}
                                                        href={`/products?category=${category.slug}`}
                                                        className="relative flex flex-col items-center justify-center p-5 bg-slate-800/50 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-blue-600/20 rounded-xl transition-all duration-300 group border border-slate-700/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden"
                                                    >
                                                        {/* Background glow effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 transition-all duration-300"></div>

                                                        {/* Category Name */}
                                                        <span className="relative z-10 text-sm text-center font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                                                            {category.name}
                                                        </span>

                                                        {/* Shine effect */}
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link
                        href="/news"
                        className={`relative text-white hover:text-purple-200 transition-all py-2 group ${pathname === "/news" || pathname?.startsWith("/news/") ? "font-semibold" : ""
                            }`}
                    >
                        Tin tức
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${pathname === "/news" || pathname?.startsWith("/news/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}></span>
                    </Link>
                    <Link
                        href="/about"
                        className={`relative text-white hover:text-purple-200 transition-all py-2 group ${pathname === "/about" ? "font-semibold" : ""
                            }`}
                    >
                        Giới thiệu
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}></span>
                    </Link>
                    <Link
                        href="/contact"
                        className={`relative text-white hover:text-purple-200 transition-all py-2 group ${pathname === "/contact" ? "font-semibold" : ""
                            }`}
                    >
                        Liên hệ thiết kế website
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}></span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Auth Buttons / User Profile */}
                <div className="hidden md:flex items-center space-x-3 ml-4">
                    {isAuthenticated && user ? (
                        <>
                            {/* Shopping Cart */}
                            <div className="relative" ref={cartRef}>
                                <button
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                    className={`relative p-2 rounded-lg hover:bg-white/10 transition-all ${showAddToCartAnimation ? "animate-shake" : ""
                                        }`}
                                    data-cart-icon
                                >
                                    <ShoppingCart className="w-6 h-6 text-white" />
                                    {getTotalItems() > 0 && (
                                        <span className={`absolute top-0 right-0 w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center ${showAddToCartAnimation ? "animate-bounce-in" : ""
                                            }`}>
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </button>

                                {/* Cart Dropdown */}
                                {isCartOpen && (
                                    <div className="absolute right-0 mt-2 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                                        {/* Header */}
                                        <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/50">
                                            <h3 className="text-white font-semibold">Giỏ hàng ({getTotalItems()} sản phẩm)</h3>
                                        </div>

                                        {/* Cart Items */}
                                        <div className="max-h-96 overflow-y-auto">
                                            {items.length > 0 ? (
                                                items.map((item) => (
                                                    <div
                                                        key={item._id || item.id}
                                                        className="px-4 py-4 border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {/* Product Logo */}
                                                            <div className="w-14 h-14 rounded-lg p-2 flex-shrink-0">
                                                                <Image
                                                                    src={item.logo}
                                                                    alt={item.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="object-contain"
                                                                />
                                                            </div>

                                                            {/* Product Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-white font-medium mb-1">
                                                                    {item.name}
                                                                </h4>
                                                                <p className="text-gray-400 text-sm mb-2">
                                                                    {(item.price || 0).toLocaleString()} Cá {item.duration}
                                                                </p>

                                                                {/* Quantity Controls */}
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => updateQuantity(item._id || item.id || '', item.quantity - 1)}
                                                                        className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                                                                    >
                                                                        <Minus className="w-3 h-3 text-white" />
                                                                    </button>
                                                                    <span className="text-white font-medium min-w-[20px] text-center">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item._id || item.id || '', item.quantity + 1)}
                                                                        className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                                                                    >
                                                                        <Plus className="w-3 h-3 text-white" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => removeFromCart(item._id || item.id || '')}
                                                                        className="ml-auto p-1 text-red-400 hover:text-red-300 transition-colors"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-8 text-center text-gray-400">
                                                    <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                    <p>Giỏ hàng trống</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        {items.length > 0 && (
                                            <>
                                                <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-gray-400">Tổng cộng:</span>
                                                        <span className="text-white font-bold text-lg">
                                                            {getTotalPrice().toLocaleString()} Cá
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-500 text-xs">
                                                        ≈ {(getTotalPrice() * 1000).toLocaleString()} VNĐ
                                                    </p>
                                                </div>
                                                <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                                                    <Link
                                                        href="/cart"
                                                        onClick={() => setIsCartOpen(false)}
                                                        className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold text-center"
                                                    >
                                                        Xem giỏ hàng & Thanh toán
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Notification Bell */}
                            <div className="relative" ref={notificationRef}>
                                <button
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                    className="relative p-2 rounded-lg hover:bg-white/10 transition-all"
                                >
                                    <Bell className="w-6 h-6 text-white" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notification Dropdown */}
                                {isNotificationOpen && (
                                    <div className="absolute right-0 mt-2 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/50">
                                            <h3 className="text-white font-semibold">Thông báo</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                                >
                                                    Đánh dấu đã đọc
                                                </button>
                                            )}
                                        </div>

                                        {/* Notifications List */}
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        onClick={() => markAsRead(notification.id)}
                                                        className={`px-4 py-3 border-b border-slate-700 cursor-pointer transition-colors ${notification.read
                                                            ? "bg-slate-800 hover:bg-slate-700"
                                                            : "bg-slate-700/50 hover:bg-slate-700"
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-2xl flex-shrink-0">
                                                                {getNotificationIcon(notification.type)}
                                                            </span>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <h4 className={`font-semibold ${notification.read ? "text-gray-300" : "text-white"
                                                                        }`}>
                                                                        {notification.title}
                                                                    </h4>
                                                                    {!notification.read && (
                                                                        <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1.5"></span>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-400 text-sm mt-1">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-gray-500 text-xs mt-2">
                                                                    {notification.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-8 text-center text-gray-400">
                                                    <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                    <p>Không có thông báo mới</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                                            <Link
                                                href="/notifications"
                                                onClick={() => setIsNotificationOpen(false)}
                                                className="text-sm text-purple-400 hover:text-purple-300 transition-colors text-center block"
                                            >
                                                Xem tất cả thông báo
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Profile Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
                                >
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500">
                                        {user.avatar?.includes("cloudinary.com") ? (
                                            <CldImage
                                                src={user.avatar}
                                                width={32}
                                                height={32}
                                                alt={user.fullName}
                                                crop="fill"
                                                gravity="face"
                                                sizes="32px"
                                            />
                                        ) : (
                                            <img
                                                src={user.avatar || "/team/member.png"}
                                                alt={user.fullName}
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                    </div>
                                    <span className="text-white font-medium hidden lg:block">
                                        {user.fullName}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-slate-700">
                                            <p className="text-white font-semibold">{user.fullName}</p>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                                            >
                                                <User className="w-4 h-4 text-purple-500 hover:text-purple-400 transition-colors" />
                                                <span>Tài khoản của tôi</span>
                                            </Link>
                                            <Link
                                                href="/orders"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                                            >
                                                <ShoppingBag className="w-4 h-4 text-purple-500 hover:text-purple-400 transition-colors" />
                                                <span>Đơn hàng của tôi</span>
                                            </Link>
                                            <Link
                                                href="/wallet"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-purple-500 hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                                <span>Ví của tôi</span>
                                            </Link>
                                            <Link
                                                href="/terms"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                                            >
                                                <FileText className="w-4 h-4 text-purple-500 hover:text-purple-400 transition-colors" />
                                                <span>Điều khoản dịch vụ</span>
                                            </Link>
                                            {/* <Link
                                                href="/wishlist"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                                            >
                                                <Heart className="w-4 h-4 text-purple-500 hover:text-purple-400 transition-colors" />
                                                <span>Yêu thích</span>
                                            </Link> */}
                                        </div>

                                        {/* Logout */}
                                        <div className="border-t border-slate-700 py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-3 w-full px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 text-red-500 hover:text-red-400 transition-colors" />
                                                <span>Đăng xuất</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        // Login/Register Buttons
                        <>
                            <Link
                                href="/login"
                                className="
                            px-4 py-2 
                            border border-white rounded-lg 
                            text-white font-medium
                            transition-all duration-300 ease-in-out
                            hover:bg-white/10 hover:border-white/80 hover:scale-105
                        "
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                href="/register"
                                className="
                            px-5 py-2
                            font-semibold text-purple-600 rounded-lg
                            bg-white
                            relative overflow-hidden
                            transition-all duration-300 ease-in-out
                            transform hover:scale-105
                            group
                        "
                            >
                                <span className="
                            absolute inset-0 
                            bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 
                            bg-[length:200%_auto] 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500
                            animate-gradient-flow
                        "></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    Đăng ký
                                </span>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-700 shadow-xl animate-in slide-in-from-top-2">
                    {/* Navigation Links */}
                    <div className="px-4 py-3 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-white transition-all ${pathname === "/" ? "bg-purple-600" : "hover:bg-slate-800"
                                }`}
                        >
                            Trang chủ
                        </Link>
                        {/* Products with Categories */}
                        <div>
                            <Link
                                href="/products"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-white font-semibold transition-all ${pathname === "/products" ? "bg-purple-600" : "hover:bg-slate-800"
                                    }`}
                            >
                                🛒 Tất cả sản phẩm
                            </Link>

                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="mt-2 ml-4 space-y-1">
                                    <p className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                        Danh mục
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/products?category=${category.slug}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition-all text-sm"
                                            >
                                                <span className="truncate">{category.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link
                            href="/news"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-white transition-all ${pathname === "/news" || pathname?.startsWith("/news/") ? "bg-purple-600" : "hover:bg-slate-800"
                                }`}
                        >
                            Tin tức
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-white transition-all ${pathname === "/about" ? "bg-purple-600" : "hover:bg-slate-800"
                                }`}
                        >
                            Giới thiệu
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-white transition-all ${pathname === "/contact" ? "bg-purple-600" : "hover:bg-slate-800"
                                }`}
                        >
                            Liên hệ thiết kế website
                        </Link>
                    </div>

                    {/* User Actions */}
                    {isAuthenticated && user ? (
                        <div className="border-t border-slate-700 px-4 py-3 space-y-2">
                            <div className="flex items-center gap-3 px-4 py-2 mb-2">
                                {user.avatar?.includes("cloudinary.com") ? (
                                    <CldImage
                                        src={user.avatar}
                                        width={40}
                                        height={40}
                                        alt={user.fullName}
                                        crop="fill"
                                        gravity="face"
                                        className="rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                                        alt={user.fullName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                )}
                                <div>
                                    <p className="text-white font-semibold">{user.fullName}</p>
                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                </div>
                            </div>
                            <Link
                                href="/cart"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-purple-400" />
                                    <span>Giỏ hàng</span>
                                </div>
                                {getTotalItems() > 0 && (
                                    <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/profile"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-all"
                            >
                                <User className="w-5 h-5 text-purple-400" />
                                <span>Tài khoản của tôi</span>
                            </Link>
                            <Link
                                href="/orders"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-all"
                            >
                                <ShoppingBag className="w-5 h-5 text-purple-400" />
                                <span>Đơn hàng của tôi</span>
                            </Link>
                            <Link
                                href="/wallet"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-all"
                            >
                                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <span>Ví của tôi</span>
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    ) : (
                        <div className="border-t border-slate-700 px-4 py-3 space-y-2">
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-center border border-white rounded-lg text-white font-medium hover:bg-white/10 transition-all"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-center bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
