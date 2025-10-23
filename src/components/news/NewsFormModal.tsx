"use client";

import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import FullEditor from "../editor/FullEditor";

interface NewsPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: "draft" | "published";
  thumbnail?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  slug?: string;
}

interface NewsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: NewsPost) => void;
  initialData?: NewsPost | null;
}

export default function NewsFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: NewsFormModalProps) {
  const [formData, setFormData] = useState<NewsPost>({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin",
    category: "Cập nhật",
    status: "draft",
    thumbnail: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    slug: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        author: "Admin",
        category: "Cập nhật",
        status: "draft",
        thumbnail: "",
        seoTitle: "",
        seoDescription: "",
        slug: "",
        seoKeywords: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      seoTitle: title,
    });
  };

  if (!isOpen) return null;

  const categories = [
    "Cập nhật",
    "Hướng dẫn",
    "Khuyến mãi",
    "So sánh",
    "Thông báo",
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-5xl my-8 mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <h3 className="text-2xl font-bold text-white">
            {initialData ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Thông tin cơ bản
            </h4>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                placeholder="bai-viet-moi"
              />
              <p className="text-xs text-neutral-500 mt-1">
                URL: /news/{formData.slug || "bai-viet-moi"}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Mô tả ngắn <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600 resize-none"
                placeholder="Mô tả ngắn về bài viết..."
              />
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
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
                  Tác giả
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <FullEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
              placeholder="Viết nội dung bài viết của bạn..."
              minHeight="400px"
            />
          </div>

          {/* SEO Section */}
          <div className="space-y-4 pt-6 border-t border-neutral-800">
            <h4 className="text-lg font-semibold text-white">
              Tối ưu hóa SEO
            </h4>

            {/* SEO Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) =>
                  setFormData({ ...formData, seoTitle: e.target.value })
                }
                maxLength={60}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                placeholder="Tiêu đề hiển thị trên Google"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.seoTitle?.length || 0}/60 ký tự
              </p>
            </div>

            {/* SEO Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                SEO Description
              </label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) =>
                  setFormData({ ...formData, seoDescription: e.target.value })
                }
                maxLength={160}
                rows={3}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600 resize-none"
                placeholder="Mô tả hiển thị trên Google"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.seoDescription?.length || 0}/160 ký tự
              </p>
            </div>

            {/* SEO Keywords */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Keywords (phân cách bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) =>
                  setFormData({ ...formData, seoKeywords: e.target.value })
                }
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                placeholder="chatgpt, ai, công nghệ"
              />
            </div>
          </div>

          {/* Status */}
          <div className="pt-4 border-t border-neutral-800">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Trạng thái
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="draft"
                  checked={formData.status === "draft"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-white">Lưu nháp</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="published"
                  checked={formData.status === "published"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-white">Xuất bản ngay</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {initialData ? "Cập nhật" : "Tạo bài viết"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
