"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Edit2, Trash2, Eye, X, Calendar, User } from "lucide-react";

interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: "draft" | "published";
  thumbnail?: string;
  createdAt: string;
  views: number;
}

export default function NewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsPost[]>([
    {
      id: "NEWS-001",
      title: "Ra mắt tính năng thanh toán bằng ví Cá",
      excerpt: "Hệ thống thanh toán mới giúp giao dịch nhanh chóng và bảo mật hơn",
      content: "Chúng tôi vui mừng thông báo ra mắt tính năng thanh toán bằng ví Cá - một hệ thống thanh toán nội bộ giúp khách hàng có thể nạp tiền và thanh toán dễ dàng hơn...",
      author: "Admin",
      category: "Cập nhật",
      status: "published",
      createdAt: "2025-10-22",
      views: 1250,
    },
    {
      id: "NEWS-002",
      title: "Hướng dẫn sử dụng ChatGPT Plus hiệu quả",
      excerpt: "Các tips và tricks để tận dụng tối đa ChatGPT Plus",
      content: "ChatGPT Plus là công cụ AI mạnh mẽ, trong bài viết này chúng tôi sẽ hướng dẫn bạn cách sử dụng hiệu quả nhất...",
      author: "Admin",
      category: "Hướng dẫn",
      status: "published",
      createdAt: "2025-10-21",
      views: 890,
    },
    {
      id: "NEWS-003",
      title: "Khuyến mãi 20% cho gói Midjourney Standard",
      excerpt: "Ưu đãi đặc biệt dành cho khách hàng mới trong tháng 10",
      content: "Từ nay đến hết tháng 10, tất cả khách hàng mới đăng ký gói Midjourney Standard sẽ được giảm giá 20%...",
      author: "Admin",
      category: "Khuyến mãi",
      status: "published",
      createdAt: "2025-10-20",
      views: 2340,
    },
    {
      id: "NEWS-004",
      title: "So sánh Claude Pro và ChatGPT Plus",
      excerpt: "Đâu là công cụ AI phù hợp với nhu cầu của bạn?",
      content: "Cả Claude Pro và ChatGPT Plus đều là những công cụ AI xuất sắc, nhưng mỗi công cụ có điểm mạnh riêng...",
      author: "Admin",
      category: "So sánh",
      status: "draft",
      createdAt: "2025-10-19",
      views: 0,
    },
    {
      id: "NEWS-005",
      title: "Thông báo bảo trì hệ thống",
      excerpt: "Hệ thống sẽ tạm ngưng hoạt động vào 2h sáng ngày 25/10",
      content: "Để nâng cấp và cải thiện chất lượng dịch vụ, hệ thống sẽ tạm ngưng hoạt động trong 2 tiếng...",
      author: "Admin",
      category: "Thông báo",
      status: "published",
      createdAt: "2025-10-18",
      views: 560,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedNews, setSelectedNews] = useState<NewsPost | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredNews = news.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewDetail = (post: NewsPost) => {
    setSelectedNews(post);
    setShowDetailModal(true);
  };

  const handleDelete = (post: NewsPost) => {
    setSelectedNews(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedNews) return;
    setNews(news.filter((post) => post.id !== selectedNews.id));
    setShowDeleteModal(false);
    setSelectedNews(null);
  };

  const toggleStatus = (postId: string) => {
    setNews(
      news.map((post) =>
        post.id === postId
          ? {
              ...post,
              status: post.status === "published" ? "draft" : "published",
            }
          : post
      )
    );
  };

  const handleAddNew = () => {
    router.push("/aduconcachienxu/news/create");
  };

  const handleEdit = (post: NewsPost) => {
    // TODO: Pass post ID via URL params
    router.push(`/aduconcachienxu/news/create?edit=true&id=${post.id}`);
  };


  const categories = ["Cập nhật", "Hướng dẫn", "Khuyến mãi", "So sánh", "Thông báo"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý Tin tức</h1>
          <p className="text-neutral-400">Tổng số: {news.length} bài viết</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm bài viết</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-600"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="published">Đã xuất bản</option>
          <option value="draft">Nháp</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-600"
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* News Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Tiêu đề
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Danh mục
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Tác giả
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Trạng thái
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Lượt xem
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Ngày tạo
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-300">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredNews.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {post.title}
                      </p>
                      <p className="text-sm text-neutral-400 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(post.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        post.status === "published"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                      }`}
                    >
                      {post.status === "published" ? "Đã xuất bản" : "Nháp"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <Eye className="w-4 h-4" />
                      <span>{post.views.toLocaleString('vi-VN')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      <span>{post.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetail(post)}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4 text-green-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            Không tìm thấy bài viết nào
          </div>
        )}
      </div>

      {/* Modal Chi tiết */}
      {showDetailModal && selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Chi tiết bài viết</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-neutral-800 rounded-lg"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Thông tin cơ bản */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {selectedNews.title}
                </h4>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedNews.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedNews.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{selectedNews.views.toLocaleString('vi-VN')} lượt xem</span>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-sm font-medium rounded-full">
                  {selectedNews.category}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedNews.status === "published"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {selectedNews.status === "published" ? "Đã xuất bản" : "Nháp"}
                </span>
              </div>

              {/* Excerpt */}
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                <p className="text-neutral-300 italic">{selectedNews.excerpt}</p>
              </div>

              {/* Content */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">Nội dung</h5>
                <div className="prose prose-invert max-w-none">
                  <p className="text-neutral-300 leading-relaxed">
                    {selectedNews.content}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEdit(selectedNews);
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleDelete(selectedNews);
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Xóa bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xác nhận xóa */}
      {showDeleteModal && selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Xác nhận xóa bài viết
              </h3>
              <p className="text-neutral-400 mb-6">
                Bạn có chắc chắn muốn xóa bài viết{" "}
                <span className="text-white font-semibold">
                  &ldquo;{selectedNews.title}&rdquo;
                </span>
                ? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
