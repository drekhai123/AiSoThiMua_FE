"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  Headphones
} from "lucide-react";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Form data:", formData);
    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

      {/* Contact Form & Info Section */}
      <section className="py-20">
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
                        khai.lumberjack@gmail.com
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
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Gửi yêu cầu tư vấn
                </h3>
                <p className="text-gray-400 mb-6">
                  Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
                </p>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Gửi thành công!
                    </h4>
                    <p className="text-gray-400">
                      Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Họ và tên <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Số điện thoại <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0123 456 789"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Công ty / Tổ chức
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Công ty ABC"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Website hiện tại (nếu có)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Nội dung yêu cầu <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Mô tả chi tiết về dự án website bạn muốn thiết kế..."
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Gửi yêu cầu tư vấn
                        </>
                      )}
                    </button>

                    <p className="text-gray-400 text-sm text-center">
                      Bằng việc gửi form, bạn đồng ý với{" "}
                      <a href="/privacy" className="text-purple-400 hover:text-purple-300">
                        Chính sách bảo mật
                      </a>{" "}
                      của chúng tôi
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

