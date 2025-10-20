"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Shield, CreditCard, Mail, Phone, MapPin, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Giới thiệu", icon: Info },
    { id: "terms", title: "Điều khoản sử dụng", icon: FileText },
    { id: "privacy", title: "Bảo mật thông tin", icon: Shield },
    { id: "payment", title: "Thanh toán & Hoàn tiền", icon: CreditCard },
    { id: "contact", title: "Liên hệ & Hỗ trợ", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Điều khoản dịch vụ
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Các điều khoản và chính sách sử dụng dịch vụ của AiSoThiMua.
            Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
            <span>Cập nhật lần cuối:</span>
            <span className="text-purple-400 font-semibold">
              {new Date().toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Mục lục</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-slate-700"
                        }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {/* Introduction Section */}
              <section id="introduction" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Info className="w-6 h-6 text-blue-400" />
                    Giới thiệu
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      Chào mừng bạn đến với <strong className="text-white">AiSoThiMua</strong> -
                      nền tảng cung cấp các dịch vụ AI và công nghệ cao cấp với giá cả hợp lý.
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        Cam kết của chúng tôi
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Cung cấp dịch vụ chất lượng cao với giá cả cạnh tranh</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Bảo mật thông tin khách hàng tuyệt đối</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Hỗ trợ khách hàng 24/7</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Giao dịch minh bạch, rõ ràng</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản
                      và chính sách được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ
                      điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.
                    </p>
                  </div>
                </div>
              </section>

              {/* Terms of Service Section */}
              <section id="terms" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-purple-400" />
                    Điều khoản sử dụng
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Định nghĩa</h3>
                      <div className="text-gray-300 space-y-2">
                        <p><strong className="text-white">&quot;Chúng tôi&quot;, &quot;Công ty&quot;</strong> - Chỉ AiSoThiMua</p>
                        <p><strong className="text-white">&quot;Bạn&quot;, &quot;Khách hàng&quot;</strong> - Người sử dụng dịch vụ</p>
                        <p><strong className="text-white">&quot;Dịch vụ&quot;</strong> - Các sản phẩm AI và công nghệ được cung cấp</p>
                        <p><strong className="text-white">&quot;Tài khoản&quot;</strong> - Thông tin đăng nhập và quản lý của khách hàng</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Điều kiện sử dụng</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Bạn phải từ 18 tuổi trở lên để sử dụng dịch vụ</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Thông tin đăng ký phải chính xác và đầy đủ</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Không được sử dụng dịch vụ cho mục đích bất hợp pháp</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300">Không được chia sẻ tài khoản với người khác</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">3. Quyền và nghĩa vụ</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-bold mb-2">Quyền của khách hàng</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Truy cập dịch vụ đã mua</li>
                            <li>• Được hỗ trợ kỹ thuật</li>
                            <li>• Yêu cầu hoàn tiền (theo chính sách)</li>
                            <li>• Bảo mật thông tin cá nhân</li>
                          </ul>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Nghĩa vụ của khách hàng</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Thanh toán đúng hạn</li>
                            <li>• Sử dụng hợp pháp</li>
                            <li>• Bảo mật tài khoản</li>
                            <li>• Tuân thủ điều khoản</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">4. Cấm sử dụng</h3>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="text-red-300 font-medium mb-3">Các hành vi bị cấm:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                          <li>• Hack, crack hoặc reverse engineering</li>
                          <li>• Phân phối lại tài khoản hoặc dịch vụ</li>
                          <li>• Spam, gửi nội dung độc hại</li>
                          <li>• Tấn công hệ thống hoặc cơ sở hạ tầng</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Privacy Section */}
              <section id="privacy" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    Bảo mật thông tin
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Thu thập thông tin</h3>
                      <p className="text-gray-300 mb-4">
                        Chúng tôi thu thập thông tin cần thiết để cung cấp dịch vụ tốt nhất:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Thông tin cá nhân: Họ tên, email, số điện thoại</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Thông tin thanh toán: Được mã hóa và bảo mật</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Dữ liệu sử dụng: Để cải thiện dịch vụ</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Bảo mật dữ liệu</h3>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                              <Shield className="w-5 h-5" />
                              Mã hóa SSL/TLS
                            </h4>
                            <p className="text-sm text-gray-300">
                              Tất cả dữ liệu được truyền tải qua kết nối được mã hóa SSL/TLS 256-bit.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                              <Shield className="w-5 h-5" />
                              Lưu trữ an toàn
                            </h4>
                            <p className="text-sm text-gray-300">
                              Dữ liệu được lưu trữ trên server được bảo mật cao với nhiều lớp bảo vệ.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">3. Chia sẻ thông tin</h3>
                      <p className="text-gray-300 mb-4">
                        Chúng tôi <strong className="text-white">KHÔNG</strong> bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ khi:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Được yêu cầu bởi cơ quan pháp luật</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Cần thiết để cung cấp dịch vụ (như nhà cung cấp thanh toán)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Được sự đồng ý rõ ràng từ bạn</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">4. Quyền của bạn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Truy cập dữ liệu</h4>
                          <p className="text-sm text-gray-300">
                            Bạn có quyền xem, tải xuống dữ liệu cá nhân của mình.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Chỉnh sửa thông tin</h4>
                          <p className="text-sm text-gray-300">
                            Cập nhật hoặc sửa đổi thông tin cá nhân bất kỳ lúc nào.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Xóa tài khoản</h4>
                          <p className="text-sm text-gray-300">
                            Yêu cầu xóa tài khoản và dữ liệu cá nhân.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Rút lại đồng ý</h4>
                          <p className="text-sm text-gray-300">
                            Rút lại sự đồng ý xử lý dữ liệu bất kỳ lúc nào.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section id="payment" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-yellow-400" />
                    Thanh toán bằng Cá & Hoàn Cá
                  </h2>

                  <div className="space-y-6">
                    {/* Primary method: Cá */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Phương thức thanh toán chính: Cá</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                          <h4 className="text-purple-400 font-bold mb-2">Nạp Cá vào ví</h4>
                          <p className="text-sm text-gray-300">Bạn có thể nạp Cá qua chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay) hoặc thẻ.</p>
                          <p className="text-xs text-gray-400 mt-2">Tỷ giá tham chiếu: 1 Cá ≈ 1.000 VNĐ (có thể thay đổi theo chương trình).</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Quy đổi & Ưu đãi</h4>
                          <p className="text-sm text-gray-300">Áp dụng quy đổi theo tỷ giá tại thời điểm nạp. Có thể có thưởng Cá theo chương trình khuyến mãi.</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-bold mb-2">Thanh toán bằng số dư Cá</h4>
                          <p className="text-sm text-gray-300">Mọi sản phẩm/dịch vụ trên hệ thống được thanh toán bằng số dư Cá trong ví.</p>
                          <p className="text-xs text-gray-400 mt-2">Nếu số dư không đủ, bạn cần nạp thêm Cá trước khi hoàn tất đơn hàng.</p>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                          <h4 className="text-cyan-400 font-bold mb-2">Hóa đơn & Lịch sử giao dịch</h4>
                          <p className="text-sm text-gray-300">Mọi giao dịch nạp/chi tiêu Cá đều được lưu trong lịch sử ví để bạn theo dõi.</p>
                        </div>
                      </div>
                    </div>

                    {/* Secondary top-up channels */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Kênh nạp Cá được hỗ trợ</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-bold mb-2">Chuyển khoản ngân hàng</h4>
                          <p className="text-sm text-gray-300">Nội dung chuyển khoản theo hướng dẫn để được cộng Cá tự động.</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Ví điện tử</h4>
                          <p className="text-sm text-gray-300">Hỗ trợ MoMo, ZaloPay, VNPay... tùy thời điểm.</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                          <h4 className="text-purple-400 font-bold mb-2">Thẻ tín dụng/ghi nợ</h4>
                          <p className="text-sm text-gray-300">Dùng để nạp Cá; không thanh toán trực tiếp đơn hàng bằng thẻ.</p>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                          <h4 className="text-orange-400 font-bold mb-2">Tiền mặt (nếu có)</h4>
                          <p className="text-sm text-gray-300">Một số chương trình/điểm hỗ trợ có thể cho phép nạp Cá bằng tiền mặt.</p>
                        </div>
                      </div>
                    </div>

                    {/* Refund policy in Cá */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">3. Chính sách hoàn Cá</h3>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                        <h4 className="text-yellow-400 font-bold mb-3">Điều kiện hoàn Cá:</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span>Hoàn 100% Cá nếu đơn hàng chưa được thực hiện/cấp tài khoản.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span>Hoàn một phần Cá nếu đã sử dụng một phần dịch vụ (tùy sản phẩm).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span>Không hoàn Cá cho các gói khuyến mãi/ưu đãi đã sử dụng.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span>Hoàn Cá trong trường hợp lỗi kỹ thuật từ phía chúng tôi.</span>
                          </li>
                        </ul>
                        <p className="text-xs text-gray-400 mt-3">Lưu ý: Hoàn Cá vào ví thay vì hoàn tiền mặt. Tỷ giá quy đổi (nếu có) áp dụng theo thời điểm nạp.</p>
                      </div>
                    </div>

                    {/* Refund process */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">4. Quy trình hoàn Cá</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                          <div>
                            <h4 className="text-white font-semibold">Gửi yêu cầu</h4>
                            <p className="text-gray-300 text-sm">Liên hệ email/hotline kèm mã đơn và lý do hoàn Cá.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                          <div>
                            <h4 className="text-white font-semibold">Xác minh</h4>
                            <p className="text-gray-300 text-sm">Kiểm tra trạng thái đơn hàng/sử dụng để xác định mức hoàn Cá.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                          <div>
                            <h4 className="text-white font-semibold">Xử lý hoàn Cá</h4>
                            <p className="text-gray-300 text-sm">Hoàn về ví trong 1-3 ngày làm việc sau khi phê duyệt.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-cyan-400" />
                    Liên hệ & Hỗ trợ
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Thông tin liên hệ</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">Email hỗ trợ</p>
                            <p className="text-gray-300 text-sm">support@aisothimua.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <Phone className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">Hotline</p>
                            <p className="text-gray-300 text-sm">1900 1234 (24/7)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/10 rounded-lg">
                            <MapPin className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">Địa chỉ</p>
                            <p className="text-gray-300 text-sm">
                              123 Đường ABC, Quận 1, TP.HCM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Thời gian hỗ trợ</h3>
                      <div className="space-y-3">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-bold mb-2">Hỗ trợ kỹ thuật</h4>
                          <p className="text-gray-300 text-sm">24/7 - Luôn sẵn sàng hỗ trợ</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Tư vấn bán hàng</h4>
                          <p className="text-gray-300 text-sm">8:00 - 22:00 (Thứ 2 - Chủ nhật)</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                          <h4 className="text-purple-400 font-bold mb-2">Khiếu nại</h4>
                          <p className="text-gray-300 text-sm">8:00 - 18:00 (Thứ 2 - Thứ 6)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-3">Cần hỗ trợ ngay?</h3>
                    <p className="text-gray-300 mb-4">
                      Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
                      Liên hệ ngay để được tư vấn miễn phí!
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold">
                        Liên hệ ngay
                      </button>
                      <button className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-semibold">
                        Chat trực tuyến
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
          >
            Về đầu trang
          </button>
        </div>
      </div>
    </main>
  );
}
