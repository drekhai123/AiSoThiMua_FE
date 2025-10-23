"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import FullEditor from "@/components/editor/FullEditor";

interface NewsPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: "draft" | "published";
  thumbnail?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    slug: string;
    ogImage?: string;
  };
}

export default function CreateNewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  
  const [formData, setFormData] = useState<NewsPost>({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin",
    category: "Cập nhật",
    status: "draft",
    thumbnail: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      slug: "",
      ogImage: "",
    },
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/đ/g, "d") // Vietnamese d
      .replace(/Ð/g, "D")
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/-+/g, "-") // Replace multiple - with single -
      .trim();
  };

  // Auto-fill SEO fields when title changes
  useEffect(() => {
    if (formData.title && !formData.seo.metaTitle) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaTitle: formData.title,
          slug: generateSlug(formData.title),
        },
      }));
    }
    if (formData.excerpt && !formData.seo.metaDescription) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaDescription: formData.excerpt,
        },
      }));
    }
  }, [formData.title, formData.excerpt]);

  const categories = ["Cập nhật", "Hướng dẫn", "Khuyến mãi", "So sánh", "Thông báo"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to backend/state management
    console.log("Saving post:", formData);
    router.push("/aduconcachienxu/news");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
              </h1>
              <p className="text-neutral-400 mt-1">
                {isEdit ? "Cập nhật thông tin bài viết" : "Điền thông tin để tạo bài viết mới"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Lưu bài viết</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Thông tin cơ bản</h2>
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Mô tả ngắn <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Nhập mô tả ngắn về bài viết..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600 resize-none"
                required
              />
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Ảnh đại diện (URL)
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Cài đặt SEO</h2>
              <span className="text-xs text-neutral-500">Tối ưu hóa cho công cụ tìm kiếm</span>
            </div>
            
            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tiêu đề SEO (Meta Title)
              </label>
              <input
                type="text"
                value={formData.seo.metaTitle}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                placeholder="Tiêu đề hiển thị trên Google (50-60 ký tự)"
                maxLength={60}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.seo.metaTitle.length}/60 ký tự
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Mô tả SEO (Meta Description)
              </label>
              <textarea
                value={formData.seo.metaDescription}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                placeholder="Mô tả ngắn gọn hiển thị trên kết quả tìm kiếm (150-160 ký tự)"
                rows={3}
                maxLength={160}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600 resize-none"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.seo.metaDescription.length}/160 ký tự
              </p>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                URL Slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-sm">/news/</span>
                <input
                  type="text"
                  value={formData.seo.slug}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, slug: e.target.value } })}
                  placeholder="url-thuan-cho-seo"
                  className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                URL thân thiện với SEO (chỉ dùng chữ thường, số và dấu gạch ngang)
              </p>
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Từ khóa (Keywords)
              </label>
              <input
                type="text"
                value={formData.seo.metaKeywords}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaKeywords: e.target.value } })}
                placeholder="chatgpt, ai tools, openai, gpt-4"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Phân cách bằng dấu phẩy (,)
              </p>
            </div>

            {/* OG Image */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Ảnh chia sẻ mạng xã hội (OG Image)
              </label>
              <input
                type="url"
                value={formData.seo.ogImage}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogImage: e.target.value } })}
                placeholder="https://example.com/og-image.jpg (1200x630px)"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Ảnh hiển thị khi chia sẻ trên Facebook, Twitter... (Kích thước đề xuất: 1200x630px)
              </p>
            </div>

            {/* SEO Preview */}
            <div className="p-4 bg-[#0a0a0a] border border-neutral-700 rounded-lg">
              <p className="text-xs text-neutral-500 mb-3 font-semibold">XEM TRƯỚC TRÊN GOOGLE:</p>
              <div className="space-y-1">
                <p className="text-blue-400 text-lg hover:underline cursor-pointer">
                  {formData.seo.metaTitle || "Tiêu đề bài viết của bạn"}
                </p>
                <p className="text-green-600 text-sm">
                  aisothimua.com › news › {formData.seo.slug || "url-slug"}
                </p>
                <p className="text-gray-400 text-sm">
                  {formData.seo.metaDescription || "Mô tả ngắn gọn về bài viết sẽ hiển thị ở đây..."}
                </p>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Nội dung bài viết</h2>
            <FullEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
              placeholder="Bắt đầu viết nội dung bài viết của bạn..."
              minHeight="600px"
              theme="dark"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pb-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>{isEdit ? "Cập nhật" : "Tạo bài viết"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
