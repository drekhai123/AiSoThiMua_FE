import { ShoppingCart, CreditCard, Wallet, Package, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import type { Metadata } from "next";
import SidebarNavigation from "@/components/policy/SidebarNavigation";
import ScrollToTop from "@/components/policy/ScrollToTop";

export const metadata: Metadata = {
  title: "Hướng dẫn mua hàng - AiSoThiMua",
  description: "Hướng dẫn chi tiết các bước mua hàng, thanh toán và nhận sản phẩm tại AiSoThiMua. Quy trình đơn giản, nhanh chóng với hệ thống thanh toán bằng Cá.",
  keywords: ["hướng dẫn mua hàng", "thanh toán", "nạp Cá", "mua tài khoản AI", "quy trình mua hàng"],
  openGraph: {
    title: "Hướng dẫn mua hàng chi tiết - AiSoThiMua",
    description: "Quy trình mua hàng đơn giản với 5 bước. Thanh toán bằng Cá, nhận sản phẩm tức thì.",
    type: "website",
  },
};

const sections = [
  { id: "intro", title: "Giới thiệu", icon: "HelpCircle" },
  { id: "steps", title: "Các bước mua hàng", icon: "ShoppingCart" },
  { id: "payment", title: "Thanh toán", icon: "CreditCard" },
  { id: "receive", title: "Nhận sản phẩm", icon: "Package" },
  { id: "faq", title: "Câu hỏi thường gặp", icon: "AlertCircle" },
];

export default function GuidePage() {

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hướng dẫn mua hàng
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Hướng dẫn chi tiết giúp bạn dễ dàng mua sắm và sử dụng dịch vụ tại AiSoThiMua.
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
            <SidebarNavigation sections={sections} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {/* Introduction Section */}
              <section id="intro" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-blue-400" />
                    Giới thiệu
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      Chào mừng bạn đến với hướng dẫn mua hàng tại <strong className="text-white">AiSoThiMua</strong>.
                      Chúng tôi đã thiết kế quy trình đơn giản và nhanh chóng để bạn có thể dễ dàng mua sắm các dịch vụ AI và công nghệ.
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        Những gì bạn cần biết
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Tạo tài khoản để quản lý đơn hàng và nhận ưu đãi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Nạp Cá vào ví để thanh toán các đơn hàng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Kiểm tra email để nhận thông tin tài khoản/dịch vụ đã mua</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Liên hệ hỗ trợ 24/7 nếu cần giúp đỡ</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Steps Section */}
              <section id="steps" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-purple-400" />
                    Các bước mua hàng
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Đăng ký tài khoản</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Truy cập trang đăng ký và điền đầy đủ thông tin: họ tên, email, số điện thoại và mật khẩu.
                        </p>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-sm text-gray-300 mb-2">Lưu ý:</p>
                          <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Sử dụng email thật để nhận thông tin đơn hàng</li>
                            <li>• Mật khẩu tối thiểu 8 ký tự, bao gồm chữ và số</li>
                            <li>• Xác thực email sau khi đăng ký</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Duyệt và chọn sản phẩm</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Xem danh sách sản phẩm, đọc mô tả chi tiết, so sánh giá cả và tính năng.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-xs text-blue-400 font-semibold mb-1">Tài khoản AI</p>
                            <p className="text-xs text-gray-300">ChatGPT, Midjourney, Claude...</p>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                            <p className="text-xs text-green-400 font-semibold mb-1">Dịch vụ công nghệ</p>
                            <p className="text-xs text-gray-300">Hosting, VPS, Domain...</p>
                          </div>
                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                            <p className="text-xs text-purple-400 font-semibold mb-1">Gói combo</p>
                            <p className="text-xs text-gray-300">Tiết kiệm hơn khi mua gói</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Thêm vào giỏ hàng</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Click &quot;Thêm vào giỏ hàng&quot; hoặc &quot;Mua ngay&quot; để tiếp tục. Bạn có thể mua nhiều sản phẩm cùng lúc.
                        </p>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                          <p className="text-sm text-yellow-300">
                            <AlertCircle className="w-4 h-4 inline mr-2" />
                            Kiểm tra kỹ thông tin sản phẩm trước khi thanh toán
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">4</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Xem lại giỏ hàng</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Kiểm tra danh sách sản phẩm, số lượng, giá cả. Áp dụng mã giảm giá (nếu có).
                        </p>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-300">Tổng sản phẩm:</span>
                            <span className="text-sm text-white font-semibold">500 Cá</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-300">Giảm giá:</span>
                            <span className="text-sm text-green-400 font-semibold">-50 Cá</span>
                          </div>
                          <div className="border-t border-slate-600 pt-2 mt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-bold">Tổng thanh toán:</span>
                              <span className="text-xl text-purple-400 font-bold">450 Cá</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">5</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Thanh toán</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Chọn &quot;Thanh toán&quot;, hệ thống sẽ trừ Cá từ ví của bạn. Nếu thiếu Cá, hãy nạp thêm.
                        </p>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-sm text-green-300">
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            Thanh toán thành công! Kiểm tra email để nhận thông tin sản phẩm.
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
                    <CreditCard className="w-6 h-6 text-green-400" />
                    Hướng dẫn thanh toán
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Nạp Cá vào ví</h3>
                      <p className="text-gray-300 mb-4">
                        Bạn cần có đủ số dư Cá trong ví để thanh toán đơn hàng. Các bước nạp Cá:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Wallet className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-2">Bước 1: Truy cập ví</h4>
                              <p className="text-sm text-gray-300">
                                Đăng nhập &gt; Click vào biểu tượng ví ở góc trên &gt; Chọn &quot;Nạp Cá&quot;
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <CreditCard className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-2">Bước 2: Chọn phương thức</h4>
                              <p className="text-sm text-gray-300 mb-2">
                                Chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay) hoặc thẻ tín dụng/ghi nợ.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-2">Bước 3: Hoàn tất giao dịch</h4>
                              <p className="text-sm text-gray-300">
                                Làm theo hướng dẫn của phương thức đã chọn. Cá sẽ được cộng vào ví trong vài phút.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Tỷ giá quy đổi</h3>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold">1 Cá</span>
                          <span className="text-2xl text-blue-400 font-bold">≈ 1.000 VNĐ</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Tỷ giá có thể thay đổi theo chương trình khuyến mãi. Khi nạp Cá, bạn sẽ thấy tỷ giá chính xác tại thời điểm đó.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">3. Ví dụ minh họa</h3>
                      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
                        <p className="text-sm text-gray-300 mb-4">
                          Bạn muốn mua sản phẩm giá <strong className="text-white">500 Cá</strong>:
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Nạp 500.000 VNĐ → Nhận 500 Cá</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Thanh toán đơn hàng bằng 500 Cá trong ví</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Nhận thông tin sản phẩm qua email</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Receive Section */}
              <section id="receive" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6 text-yellow-400" />
                    Nhận sản phẩm/dịch vụ
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Thông tin giao hàng</h3>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                        <p className="text-gray-300 mb-4">
                          Sau khi thanh toán thành công, bạn sẽ nhận được:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Email xác nhận:</strong> Thông tin đơn hàng, mã giao dịch</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Thông tin tài khoản:</strong> Username, password, link kích hoạt</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Hướng dẫn sử dụng:</strong> Cách kích hoạt và sử dụng sản phẩm</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Thời gian giao hàng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-bold mb-2">Tài khoản AI</h4>
                          <p className="text-sm text-gray-300">Giao tức thì sau khi thanh toán (1-5 phút)</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                          <h4 className="text-purple-400 font-bold mb-2">Dịch vụ khác</h4>
                          <p className="text-sm text-gray-300">2-24 giờ tùy loại dịch vụ</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">3. Kiểm tra đơn hàng</h3>
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <p className="text-sm text-gray-300 mb-3">
                          Đăng nhập &gt; Tài khoản &gt; Đơn hàng của tôi
                        </p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Xem trạng thái đơn hàng</li>
                          <li>• Tải lại thông tin tài khoản</li>
                          <li>• Xem lịch sử giao dịch</li>
                          <li>• Yêu cầu hỗ trợ nếu có vấn đề</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-400" />
                    Câu hỏi thường gặp
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">❓ Tôi có thể thanh toán trực tiếp bằng tiền không?</h4>
                      <p className="text-gray-300 text-sm">
                        Không. Tất cả đơn hàng phải thanh toán bằng Cá trong ví. Bạn cần nạp Cá trước khi mua hàng.
                      </p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">❓ Tôi chưa nhận được email sau khi thanh toán?</h4>
                      <p className="text-gray-300 text-sm">
                        Kiểm tra hộp thư spam/junk. Nếu vẫn không thấy, liên hệ hotline <strong className="text-white">1900 1234</strong> hoặc email <strong className="text-white">support@aisothimua.com</strong>
                      </p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">❓ Tài khoản không hoạt động sau khi mua?</h4>
                      <p className="text-gray-300 text-sm">
                        Liên hệ hỗ trợ ngay với mã đơn hàng. Chúng tôi sẽ kiểm tra và xử lý trong vòng 2-6 giờ.
                      </p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">❓ Tôi muốn đổi sang sản phẩm khác?</h4>
                      <p className="text-gray-300 text-sm">
                        Xem <strong className="text-white">Chính sách đổi trả</strong>. Nếu đơn hàng chưa sử dụng, bạn có thể yêu cầu hoàn Cá để mua sản phẩm khác.
                      </p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-2">❓ Có mã giảm giá cho khách hàng mới không?</h4>
                      <p className="text-gray-300 text-sm">
                        Có! Đăng ký nhận bản tin để nhận mã giảm giá và ưu đãi đặc biệt qua email.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6 mt-6">
                      <h4 className="text-white font-bold mb-3">Vẫn còn thắc mắc?</h4>
                      <p className="text-gray-300 mb-4 text-sm">
                        Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="text-sm">
                          <span className="text-gray-400">Hotline:</span>
                          <span className="text-white font-semibold ml-2">+84 901267368</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Email:</span>
                          <span className="text-white font-semibold ml-2">aisothimua@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </main>
  );
}
