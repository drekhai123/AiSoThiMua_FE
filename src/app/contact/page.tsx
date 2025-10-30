import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Building,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  Headphones
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ thiết kế website - AiSoThiMua",
  description: "Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết về thiết kế website chuyên nghiệp. Hỗ trợ 24/7, giao hàng đúng deadline, bảo hành kỹ thuật.",
  keywords: ["liên hệ", "thiết kế website", "tư vấn web", "báo giá website", "web design", "contact"],
  openGraph: {
    title: "Liên hệ thiết kế website chuyên nghiệp - AiSoThiMua",
    description: "Nhận tư vấn miễn phí về thiết kế website. Đội ngũ chuyên nghiệp, hỗ trợ 24/7, giao đúng deadline.",
    type: "website",
  },
};

const SERVICES = [
  {
    icon: Globe,
    title: "Website Doanh Nghiệp",
    description: "Website giới thiệu công ty, tổ chức chuyên nghiệp",
    features: ["Responsive Design", "SEO Optimized", "Admin Panel"]
  },
  {
    icon: Building,
    title: "Website Thương Mại",
    description: "E-commerce, bán hàng trực tuyến hiện đại",
    features: ["Giỏ hàng", "Thanh toán", "Quản lý đơn hàng"]
  },
  {
    icon: Zap,
    title: "Landing Page",
    description: "Trang đích chuyển đổi cao cho marketing",
    features: ["Fast Loading", "Call-to-Action", "Analytics"]
  },
  {
    icon: User,
    title: "Website Cá Nhân",
    description: "Portfolio, blog cá nhân độc đáo",
    features: ["Modern UI", "Blog System", "Contact Form"]
  },
];

const WHY_CHOOSE = [
  { icon: Zap, text: "Giao hàng đúng deadline" },
  { icon: Shield, text: "Bảo hành & hỗ trợ kỹ thuật" },
  { icon: Globe, text: "Tối ưu SEO & tốc độ" },
  { icon: Headphones, text: "Tư vấn miễn phí 24/7" },
];

const PLANS = [
  {
    name: "Landing Page",
    subtitle: "Trang đích đơn giản, hiệu quả",
    price: "3-5 triệu",
    duration: "5-7 ngày",
    features: [
      "1 trang đơn (Single Page)",
      "Thiết kế responsive",
      "Form liên hệ tích hợp",
      "Tối ưu tốc độ tải",
      "SEO cơ bản",
      "SSL bảo mật miễn phí",
    ],
    cta: "Tư vấn ngay",
    highlight: false,
  },
  {
    name: "Website Doanh Nghiệp",
    subtitle: "Giải pháp hoàn chỉnh cho công ty vừa và nhỏ",
    price: "10-15 triệu",
    duration: "3-5 tuần",
    features: [
      "5-10 trang nội dung",
      "Hệ thống quản trị CMS",
      "Responsive mọi thiết bị",
      "SEO nâng cao + Schema",
      "Tích hợp Google Analytics",
      "Hỗ trợ & bảo hành 6 tháng",
    ],
    cta: "Tư vấn ngay",
    highlight: true,
    badge: "Phổ biến nhất",
  },
  {
    name: "Website Thương Mại",
    subtitle: "Giải pháp bán hàng trực tuyến chuyên nghiệp",
    price: "Từ 20 triệu",
    duration: "6-10 tuần",
    features: [
      "Quản lý sản phẩm đa dạng",
      "Giỏ hàng & thanh toán online",
      "Quản lý đơn hàng & khách hàng",
      "Tích hợp vận chuyển",
      "Dashboard thống kê",
      "Bảo hành & hỗ trợ 1 năm",
    ],
    cta: "Tư vấn ngay",
    highlight: false,
  },
];

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Liên hệ thiết kế website
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Chúng tôi sẵn sàng biến ý tưởng của bạn thành hiện thực.
              Liên hệ ngay để nhận tư vấn <span className="text-purple-400 font-semibold">miễn phí</span> và
              báo giá chi tiết nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Dịch vụ thiết kế website
            </h2>
            <p className="text-gray-400">
              Chúng tôi cung cấp đa dạng gói dịch vụ phù hợp với mọi nhu cầu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY_CHOOSE.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700"
                >
                  <Icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Các dự án đã thực hiện bởi chúng tôi */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Các dự án đã thực hiện</h2>
            <p className="text-gray-400">Những dự án chúng tôi tự hào đã hoàn thành</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* DNL Investment */}
            <a
              href="https://dnlinvestment.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center p-2">
                    <Image
                      src="/project/dnl-logo.png"
                      alt="DNL Investment"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">DNL Investment</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-300 text-sm mb-4 flex-1">
                  Website tư vấn tài chính chuyên nghiệp với giao diện hiện đại, tích hợp tính năng realtime và quản lý tin tức và bài viết.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-purple-400 text-sm font-semibold group-hover:text-purple-300 transition-colors">
                    Xem website →
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">.NET Core</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">MS SQL Server</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Agis Real */}
            <a
              href="https://agisreal.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <div className="aspect-video bg-gradient-to-br from-green-600/20 to-blue-600/20 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center p-2">
                    <Image
                      src="/project/agis-logo.png"
                      alt="Agis Real"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Agis Real</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-300 text-sm mb-4 flex-1">
                  Website xem và tìm kiếm dự án bất động sản chuyên nghiệp với giao diện hiện đại, tích hợp bản đồ tương tác.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-purple-400 text-sm font-semibold group-hover:text-purple-300 transition-colors">
                    Xem website →
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Next.js</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">NestJS</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">MySQL</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Gói thiết kế website */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Gói thiết kế website</h2>
            <p className="text-gray-400">Linh hoạt theo nhu cầu và ngân sách của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl border ${plan.highlight ? "border-purple-500/60 ring-2 ring-purple-500/40" : "border-slate-700"
                  } bg-gradient-to-br from-slate-800 to-slate-900 p-6 hover:translate-y-[-2px] transition-all`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{plan.subtitle}</p>
                </div>

                <div className="mb-4">
                  <div className="text-4xl font-extrabold text-white mb-2">{plan.price}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-400">Thời gian: {plan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact-form"
                  className={`w-full px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                >
                  {plan.cta}
                </a>

                {plan.highlight && (
                  <p className="text-center text-xs text-gray-400 mt-3">Khuyến nghị cho 80% khách hàng</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section id="contact-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Thông tin liên hệ
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a href="mailto:contact@aisothimua.vn" className="text-white hover:text-purple-400 transition-colors">
                        aisothimua@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Hotline</p>
                      <a href="tel:0123456789" className="text-white hover:text-blue-400 transition-colors">
                        0901 267 368
                      </a>
                      <p className="text-gray-500 text-xs mt-1">(8:00 - 22:00 hàng ngày)</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Địa chỉ</p>
                      <p className="text-white">
                        Quận 12, TP. Hồ Chí Minh<br />
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Giờ làm việc</p>
                      <p className="text-white">
                        Hàng ngày: 8:00 - 22:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
                <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-white font-semibold mb-2">
                  Phản hồi nhanh chóng
                </h4>
                <p className="text-gray-300 text-sm">
                  Chúng tôi cam kết phản hồi mọi yêu cầu trong vòng 24 giờ.
                  Hotline luôn sẵn sàng hỗ trợ từ 8:00 - 22:00 hàng ngày.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

