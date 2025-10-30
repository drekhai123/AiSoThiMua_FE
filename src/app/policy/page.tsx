import { RotateCcw, CheckCircle, AlertCircle, Clock, Package, Shield } from "lucide-react";
import type { Metadata } from "next";
import SidebarNavigation from "@/components/policy/SidebarNavigation";
import ScrollToTop from "@/components/policy/ScrollToTop";

export const metadata: Metadata = {
  title: "Chính sách đổi trả - AiSoThiMua",
  description: "Chính sách đổi trả rõ ràng và công bằng tại AiSoThiMua. Hoàn Cá 100% cho các trường hợp đủ điều kiện. Xử lý nhanh chóng trong 24-48 giờ.",
  keywords: ["chính sách đổi trả", "hoàn Cá", "quy trình đổi trả", "quyền lợi khách hàng"],
  openGraph: {
    title: "Chính sách đổi trả miễn phí - AiSoThiMua",
    description: "Hoàn Cá 100% cho tài khoản chưa kích hoạt. Quy trình đơn giản, xử lý trong 24-48 giờ.",
    type: "website",
  },
};

const sections = [
  { id: "overview", title: "Tổng quan", icon: "Package" },
  { id: "conditions", title: "Điều kiện đổi trả", icon: "CheckCircle" },
  { id: "process", title: "Quy trình", icon: "Clock" },
  { id: "exceptions", title: "Trường hợp ngoại lệ", icon: "AlertCircle" },
];

export default function PolicyPage() {

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Chính sách đổi trả
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Chúng tôi cam kết đảm bảo quyền lợi của khách hàng với chính sách đổi trả rõ ràng và công bằng.
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
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6 text-blue-400" />
                    Tổng quan
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      Tại <strong className="text-white">AiSoThiMua</strong>, chúng tôi hiểu rằng đôi khi bạn có thể cần đổi hoặc trả lại sản phẩm/dịch vụ.
                      Chính sách đổi trả của chúng tôi được thiết kế để đảm bảo quyền lợi tốt nhất cho khách hàng.
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        Cam kết của chúng tôi
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Xử lý yêu cầu đổi trả nhanh chóng trong 24-48 giờ</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Hoàn Cá 100% cho các trường hợp đủ điều kiện</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Quy trình đơn giản, minh bạch</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                          <span>Hỗ trợ khách hàng 24/7</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Conditions Section */}
              <section id="conditions" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    Điều kiện đổi trả
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Sản phẩm/Dịch vụ đủ điều kiện</h3>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Tài khoản AI chưa kích hoạt:</strong> Hoàn 100% Cá nếu tài khoản chưa được sử dụng</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Sản phẩm lỗi kỹ thuật:</strong> Lỗi do hệ thống, không sử dụng được</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Giao sai sản phẩm:</strong> Không đúng với mô tả hoặc đơn hàng</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Trong thời gian quy định:</strong> Yêu cầu đổi trả trong vòng 7 ngày kể từ ngày mua</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Mức hoàn Cá theo tình trạng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-bold mb-2">100% Cá</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Chưa sử dụng</li>
                            <li>• Lỗi kỹ thuật</li>
                            <li>• Giao sai</li>
                          </ul>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                          <h4 className="text-yellow-400 font-bold mb-2">50% Cá</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Đã sử dụng một phần</li>
                            <li>• Trong thời hạn</li>
                          </ul>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <h4 className="text-red-400 font-bold mb-2">Không hoàn</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Đã sử dụng hết</li>
                            <li>• Quá thời hạn</li>
                            <li>• Vi phạm điều khoản</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">3. Thời gian đổi trả</h3>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              Tài khoản AI
                            </h4>
                            <p className="text-sm text-gray-300">
                              <strong className="text-white">7 ngày</strong> kể từ khi nhận tài khoản
                            </p>
                          </div>
                          <div>
                            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              Dịch vụ khác
                            </h4>
                            <p className="text-sm text-gray-300">
                              <strong className="text-white">3-7 ngày</strong> tùy theo loại dịch vụ
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Process Section */}
              <section id="process" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-purple-400" />
                    Quy trình đổi trả
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Gửi yêu cầu đổi trả</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Liên hệ qua email: <strong className="text-white">support@aisothimua.com</strong> hoặc hotline: <strong className="text-white">1900 1234</strong>
                          </p>
                          <div className="bg-slate-700/50 rounded-lg p-4">
                            <p className="text-sm text-gray-300 mb-2">Thông tin cần cung cấp:</p>
                            <ul className="text-sm text-gray-400 space-y-1">
                              <li>• Mã đơn hàng</li>
                              <li>• Lý do đổi trả</li>
                              <li>• Ảnh chụp màn hình (nếu có lỗi)</li>
                              <li>• Thông tin tài khoản đã đăng ký</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Xác minh thông tin</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Bộ phận hỗ trợ sẽ kiểm tra đơn hàng, trạng thái sử dụng và xác định điều kiện đổi trả.
                          </p>
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <p className="text-sm text-blue-300">
                              <Clock className="w-4 h-4 inline mr-2" />
                              Thời gian xử lý: <strong>2-6 giờ</strong> trong giờ hành chính
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Phê duyệt yêu cầu</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Sau khi xác minh, bạn sẽ nhận được email/SMS thông báo kết quả phê duyệt và mức hoàn Cá.
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                              <p className="text-xs text-green-400 font-semibold mb-1">Chấp nhận</p>
                              <p className="text-xs text-gray-300">Chuyển sang bước 4</p>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                              <p className="text-xs text-red-400 font-semibold mb-1">Từ chối</p>
                              <p className="text-xs text-gray-300">Giải thích lý do chi tiết</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">4</div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Hoàn Cá vào ví</h4>
                          <p className="text-gray-300 text-sm mb-3">
                            Số Cá được hoàn sẽ được cộng trực tiếp vào ví của bạn để sử dụng cho các đơn hàng tiếp theo.
                          </p>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <p className="text-sm text-green-300">
                              <CheckCircle className="w-4 h-4 inline mr-2" />
                              Thời gian hoàn: <strong>1-3 ngày làm việc</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Exceptions Section */}
              <section id="exceptions" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                    Trường hợp ngoại lệ
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                      <h3 className="text-red-300 font-bold mb-4">Không áp dụng đổi trả trong các trường hợp sau:</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                          <span>
                            <strong className="text-white">Đã sử dụng toàn bộ dịch vụ:</strong> Tài khoản đã được kích hoạt và sử dụng hết thời hạn/tính năng
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                          <span>
                            <strong className="text-white">Quá thời hạn:</strong> Yêu cầu đổi trả sau 7 ngày (hoặc thời gian quy định cho từng sản phẩm)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                          <span>
                            <strong className="text-white">Vi phạm điều khoản:</strong> Sử dụng sai mục đích, chia sẻ tài khoản, gian lận
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                          <span>
                            <strong className="text-white">Sản phẩm khuyến mãi:</strong> Các gói ưu đãi đặc biệt, giảm giá sâu thường không áp dụng đổi trả
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                          <span>
                            <strong className="text-white">Không cung cấp đủ thông tin:</strong> Thiếu mã đơn hàng, bằng chứng, hoặc thông tin xác minh
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <h3 className="text-yellow-300 font-bold mb-4">Lưu ý quan trọng:</h3>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Chỉ hoàn Cá vào ví, không hoàn tiền mặt hoặc chuyển khoản ngân hàng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Tỷ giá quy đổi Cá áp dụng theo thời điểm nạp ban đầu</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Mỗi đơn hàng chỉ được yêu cầu đổi trả một lần</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>Quyết định cuối cùng về việc chấp nhận đổi trả thuộc về AiSoThiMua</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h3 className="text-blue-300 font-bold mb-3">Cần hỗ trợ thêm?</h3>
                      <p className="text-gray-300 mb-4 text-sm">
                        Nếu bạn có thắc mắc về chính sách đổi trả hoặc cần tư vấn chi tiết, vui lòng liên hệ:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="text-sm">
                          <span className="text-gray-400">Email:</span>
                          <span className="text-white font-semibold ml-2">aisothimua@gmail.com</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Hotline:</span>
                          <span className="text-white font-semibold ml-2">+84 901267368</span>
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
