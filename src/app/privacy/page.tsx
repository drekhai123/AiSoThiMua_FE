import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";
import SidebarNavigation from "@/components/policy/SidebarNavigation";
import ScrollToTop from "@/components/policy/ScrollToTop";

export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin - AiSoThiMua",
  description: "Chính sách bảo mật thông tin cá nhân tại AiSoThiMua. Cam kết bảo vệ quyền riêng tư và bảo mật dữ liệu khách hàng tuyệt đối.",
  keywords: ["bảo mật thông tin", "quyền riêng tư", "bảo vệ dữ liệu", "GDPR", "privacy"],
  openGraph: {
    title: "Chính sách bảo mật - AiSoThiMua",
    description: "Bảo vệ quyền riêng tư và bảo mật dữ liệu cá nhân với mã hóa SSL/TLS 256-bit.",
    type: "website",
  },
};

const sections = [
  { id: "intro", title: "Giới thiệu", icon: "Shield" },
  { id: "collect", title: "Thu thập thông tin", icon: "Database" },
  { id: "security", title: "Bảo mật dữ liệu", icon: "Lock" },
  { id: "usage", title: "Sử dụng thông tin", icon: "Eye" },
  { id: "rights", title: "Quyền của bạn", icon: "UserCheck" },
  { id: "updates", title: "Cập nhật chính sách", icon: "AlertTriangle" },
];

export default function PrivacyPage() {

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Chính sách bảo mật thông tin
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân của bạn.
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
                    <Shield className="w-6 h-6 text-blue-400" />
                    Giới thiệu
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      Tại <strong className="text-white">AiSoThiMua</strong>, chúng tôi tôn trọng quyền riêng tư của bạn
                      và cam kết bảo vệ thông tin cá nhân mà bạn chia sẻ với chúng tôi.
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-bold text-white mb-3">Cam kết của chúng tôi</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>✅ Bảo mật thông tin cá nhân tuyệt đối</li>
                        <li>✅ Không bán hoặc chia sẻ dữ liệu với bên thứ ba</li>
                        <li>✅ Tuân thủ các quy định về bảo vệ dữ liệu cá nhân</li>
                        <li>✅ Minh bạch về cách thu thập và sử dụng thông tin</li>
                        <li>✅ Trao quyền kiểm soát dữ liệu cho người dùng</li>
                      </ul>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      Chính sách này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
                    </p>
                  </div>
                </div>
              </section>

              {/* Collection Section */}
              <section id="collect" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Database className="w-6 h-6 text-purple-400" />
                    Thu thập thông tin
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">1. Thông tin bạn cung cấp</h3>
                      <div className="space-y-3">
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-2">Thông tin đăng ký tài khoản</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Họ và tên</li>
                            <li>• Địa chỉ email</li>
                            <li>• Số điện thoại</li>
                            <li>• Mật khẩu (được mã hóa)</li>
                          </ul>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-2">Thông tin giao dịch</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Lịch sử mua hàng</li>
                            <li>• Phương thức thanh toán (không lưu thông tin thẻ đầy đủ)</li>
                            <li>• Số dư ví Cá</li>
                            <li>• Lịch sử nạp/rút</li>
                          </ul>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-2">Thông tin liên hệ</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Nội dung tin nhắn/email hỗ trợ</li>
                            <li>• Phản hồi, đánh giá sản phẩm</li>
                            <li>• Yêu cầu đổi trả/khiếu nại</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">2. Thông tin tự động thu thập</h3>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>🌐 <strong className="text-white">Địa chỉ IP</strong> - Để phát hiện gian lận và đảm bảo an ninh</li>
                          <li>🖥️ <strong className="text-white">Loại thiết bị và trình duyệt</strong> - Để tối ưu trải nghiệm người dùng</li>
                          <li>📍 <strong className="text-white">Thông tin vị trí (nếu cho phép)</strong> - Để cung cấp dịch vụ phù hợp</li>
                          <li>🕒 <strong className="text-white">Thời gian truy cập</strong> - Để phân tích và cải thiện dịch vụ</li>
                          <li>🍪 <strong className="text-white">Cookies</strong> - Để ghi nhớ tùy chọn và cải thiện trải nghiệm</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Security Section */}
              <section id="security" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-green-400" />
                    Bảo mật dữ liệu
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                        <Lock className="w-8 h-8 text-green-400 mb-3" />
                        <h4 className="text-white font-bold mb-2">Mã hóa SSL/TLS</h4>
                        <p className="text-sm text-gray-300">
                          Tất cả dữ liệu truyền tải được mã hóa 256-bit SSL/TLS, đảm bảo an toàn tuyệt đối.
                        </p>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                        <Shield className="w-8 h-8 text-blue-400 mb-3" />
                        <h4 className="text-white font-bold mb-2">Mật khẩu được bảo vệ</h4>
                        <p className="text-sm text-gray-300">
                          Mật khẩu được mã hóa bằng thuật toán bcrypt, không thể giải mã ngược.
                        </p>
                      </div>

                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                        <Database className="w-8 h-8 text-purple-400 mb-3" />
                        <h4 className="text-white font-bold mb-2">Lưu trữ an toàn</h4>
                        <p className="text-sm text-gray-300">
                          Dữ liệu được lưu trữ trên server có bảo mật cao, backup định kỳ.
                        </p>
                      </div>

                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                        <AlertTriangle className="w-8 h-8 text-orange-400 mb-3" />
                        <h4 className="text-white font-bold mb-2">Phát hiện gian lận</h4>
                        <p className="text-sm text-gray-300">
                          Hệ thống giám sát 24/7 để phát hiện và ngăn chặn truy cập bất thường.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <h4 className="text-yellow-400 font-bold mb-3">⚠️ Trách nhiệm của bạn</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Giữ bí mật mật khẩu và không chia sẻ với người khác</li>
                        <li>• Sử dụng mật khẩu mạnh (ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt)</li>
                        <li>• Đăng xuất sau khi sử dụng trên thiết bị chung</li>
                        <li>• Cập nhật thông tin bảo mật định kỳ</li>
                        <li>• Báo ngay cho chúng tôi nếu phát hiện hoạt động bất thường</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Usage Section */}
              <section id="usage" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    Sử dụng thông tin
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Chúng tôi sử dụng thông tin của bạn để:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-white font-semibold mb-2">✅ Cung cấp dịch vụ</p>
                          <p className="text-sm text-gray-300">
                            Xử lý đơn hàng, giao sản phẩm, hỗ trợ khách hàng
                          </p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-white font-semibold mb-2">✅ Cải thiện trải nghiệm</p>
                          <p className="text-sm text-gray-300">
                            Phân tích hành vi để tối ưu hóa website và dịch vụ
                          </p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-white font-semibold mb-2">✅ Bảo mật tài khoản</p>
                          <p className="text-sm text-gray-300">
                            Xác thực danh tính, phát hiện và ngăn chặn gian lận
                          </p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-white font-semibold mb-2">✅ Giao tiếp</p>
                          <p className="text-sm text-gray-300">
                            Gửi thông báo đơn hàng, cập nhật dịch vụ, khuyến mãi
                          </p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-white font-semibold mb-2">✅ Tuân thủ pháp luật</p>
                          <p className="text-sm text-gray-300">
                            Đáp ứng yêu cầu của cơ quan nhà nước khi cần thiết
                          </p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-white font-semibold mb-2">✅ Marketing</p>
                          <p className="text-sm text-gray-300">
                            Gửi ưu đãi, tin tức (bạn có thể từ chối bất kỳ lúc nào)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                      <h4 className="text-red-300 font-bold mb-3">❌ Chúng tôi KHÔNG:</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Bán thông tin cá nhân của bạn</li>
                        <li>• Chia sẻ dữ liệu với bên thứ ba cho mục đích marketing (trừ khi có sự đồng ý)</li>
                        <li>• Sử dụng thông tin ngoài mục đích đã nêu</li>
                        <li>• Spam hoặc gửi email không mong muốn</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rights Section */}
              <section id="rights" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-purple-400" />
                    Quyền của bạn
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h4 className="text-blue-300 font-bold mb-3">🔍 Quyền truy cập</h4>
                      <p className="text-gray-300 text-sm">
                        Bạn có quyền xem và tải xuống dữ liệu cá nhân mà chúng tôi lưu trữ về bạn.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
                      <h4 className="text-green-300 font-bold mb-3">✏️ Quyền chỉnh sửa</h4>
                      <p className="text-gray-300 text-sm">
                        Bạn có thể cập nhật, sửa đổi hoặc bổ sung thông tin cá nhân bất kỳ lúc nào trong phần cài đặt tài khoản.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <h4 className="text-yellow-300 font-bold mb-3">🗑️ Quyền xóa</h4>
                      <p className="text-gray-300 text-sm">
                        Bạn có quyền yêu cầu xóa tài khoản và dữ liệu cá nhân. Chúng tôi sẽ xử lý trong vòng 7-14 ngày làm việc.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
                      <h4 className="text-purple-300 font-bold mb-3">🚫 Quyền từ chối</h4>
                      <p className="text-gray-300 text-sm">
                        Bạn có thể từ chối nhận email marketing hoặc rút lại sự đồng ý xử lý dữ liệu (trừ dữ liệu cần thiết để cung cấp dịch vụ).
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
                      <h4 className="text-red-300 font-bold mb-3">⚖️ Quyền khiếu nại</h4>
                      <p className="text-gray-300 text-sm">
                        Nếu bạn cho rằng quyền riêng tư của mình bị vi phạm, bạn có quyền khiếu nại với cơ quan bảo vệ dữ liệu cá nhân.
                      </p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mt-6">
                      <h4 className="text-white font-bold mb-3">📧 Cách thực hiện quyền của bạn</h4>
                      <p className="text-gray-300 mb-3 text-sm">
                        Để thực hiện các quyền trên, vui lòng liên hệ:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <span className="text-white font-semibold ml-2">aisothimua@gmail.com</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Hotline:</span>
                          <span className="text-white font-semibold ml-2">+84 901267368</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Updates Section */}
              <section id="updates" className="scroll-mt-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                    Cập nhật chính sách
                  </h2>

                  <div className="space-y-6">
                    <p className="text-gray-300">
                      Chúng tôi có thể cập nhật Chính sách bảo mật này theo thời gian để phản ánh các thay đổi trong hoạt động kinh doanh hoặc yêu cầu pháp lý.
                    </p>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <h4 className="text-yellow-400 font-bold mb-3">📢 Khi có thay đổi quan trọng:</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Chúng tôi sẽ thông báo qua email</li>
                        <li>• Đăng thông báo nổi bật trên website</li>
                        <li>• Cập nhật ngày &quot;Cập nhật lần cuối&quot; ở đầu trang</li>
                        <li>• Yêu cầu xác nhận đồng ý nếu thay đổi ảnh hưởng lớn đến quyền của bạn</li>
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h4 className="text-blue-400 font-bold mb-3">💡 Khuyến nghị</h4>
                      <p className="text-gray-300 text-sm">
                        Vui lòng xem lại chính sách này định kỳ để cập nhật các thay đổi.
                        Việc tiếp tục sử dụng dịch vụ sau khi chính sách được cập nhật đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
                      <h4 className="text-white font-bold mb-3">Liên hệ với chúng tôi</h4>
                      <p className="text-gray-300 mb-4 text-sm">
                        Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <p className="text-white font-semibold">aisothimua@gmail.com</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Hotline:</span>
                          <p className="text-white font-semibold">+84 901267368</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Địa chỉ:</span>
                          <p className="text-white font-semibold">Thành phố Hồ Chí Minh, Việt Nam</p>
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
