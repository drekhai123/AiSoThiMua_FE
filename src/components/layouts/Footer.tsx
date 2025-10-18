import Link from "next/link";
import Image from "next/image";

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
            <h3 className="font-semibold text-foreground mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Liên hệ thiết kế website
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Bảo mật thông tin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <span>khai.lumberjack@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span>0901267368</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span>Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8">
          <p className="text-muted-foreground">
            © 2025 ASTM. Tất cả quyền được bảo lưu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
