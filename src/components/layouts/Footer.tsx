import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Shield,
  HelpCircle,
  RotateCcw,
  Home,
  ShoppingBag,
  Info,
  Globe
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card bg-gradient-to-l from-purple-600 to-blue-600 mt-20 shadow-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image src="/logos/ASTM.svg" alt="ASTM Logo" width={160} height={40} />
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-foreground">Shop công nghệ số</span>
            </div>
            <p className="text-muted-foreground">
              Cung cấp tài khoản AI và dịch vụ công nghệ số uy tín, chất lượng cao.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Liên kết
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-white transition-all duration-300 flex items-center gap-2 hover:translate-x-1 hover:scale-105 group">
                  <Home className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-white transition-all duration-300 flex items-center gap-2 hover:translate-x-1 hover:scale-105 group">
                  <ShoppingBag className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 hover:translate-x-1 hover:scale-105 group">
                  <Info className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 hover:translate-x-1 hover:scale-105 group">
                  <Globe className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  Liên hệ thiết kế website
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Hỗ trợ
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 hover:translate-x-1 hover:scale-105 group">
                  <FileText className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Bảo mật thông tin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Thông tin công ty
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer">
                <Mail className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span>khai.lumberjack@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer">
                <Phone className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                <span>0901267368</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer">
                <MapPin className="w-4 h-4 group-hover:text-red-400 transition-colors" />
                <span>Hồ Chí Minh, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer">
                <Building2 className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                <span>MST: 8802849554 </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8">
          <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/40 rounded">
            <p className="text-white font-semibold">Verification code: OS7K3L</p>
          </div>
          <p className="text-muted-foreground">
            © 2025 ASTM. Tất cả quyền được bảo lưu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
