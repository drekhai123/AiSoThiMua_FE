import Image from "next/image";
import Link from "next/link";


export default function Navbar(){
    return(
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
                        <Link href="/" className="text-white hover:text-purple-200 transition">
                        Trang chủ
                        </Link>
                        <Link href="/products" className="text-white hover:text-purple-200 transition">
                        Sản phẩm
                        </Link>
                        <Link href="/about" className="text-white hover:text-purple-200 transition">
                        Giới thiệu
                        </Link>
                        <Link href="/contact" className="text-white hover:text-purple-200 transition">
                        Liên hệ
                        </Link>
                </div>
                {/* Auth Buttons */}
                <div className="flex items-center space-x-3 ml-4">
                        {/* Nút Đăng nhập */}
                        <Link 
                            href="/login"
                            className="px-4 border border-white rounded-lg py-2 text-white hover:text-purple-100 transition font-medium"
                        >
                            Đăng nhập
                        </Link>
                        
                        {/* Nút Đăng ký */}
                        <Link 
                            href="/register"
                            className="px-5 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Đăng ký
                        </Link>
                    </div>
            </div>
        </nav>
    );
}