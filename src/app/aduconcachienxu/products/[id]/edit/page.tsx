"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";

interface ProductForm {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  image: string;
  status: "active" | "inactive";
  features: string[];
}

// Mock data - replace with actual API call
const mockProducts: Record<string, ProductForm> = {
  "1": {
    name: "ChatGPT Plus 1 tháng",
    description: "Tài khoản ChatGPT Plus chính hãng, truy cập GPT-4 không giới hạn",
    price: 450000,
    originalPrice: 500000,
    category: "AI Tools",
    stock: 50,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    status: "active",
    features: [
      "Truy cập GPT-4 không giới hạn",
      "Tốc độ phản hồi nhanh hơn",
      "Ưu tiên sử dụng trong giờ cao điểm",
    ],
  },
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "AI Tools",
    stock: 0,
    image: "",
    status: "active",
    features: [],
  });

  const [newFeature, setNewFeature] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["AI Tools", "Software", "Hosting", "VPN", "Domain", "Khác"];

  useEffect(() => {
    // Load product data
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        const product = mockProducts[productId];
        if (product) {
          setFormData(product);
        } else {
          alert("Không tìm thấy sản phẩm");
          router.push("/aduconcachienxu/products");
        }
      } catch (error) {
        console.error("Failed to load product:", error);
        alert("Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update product via API
    console.log("Updating product:", productId, formData);
    router.push("/aduconcachienxu/products");
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-neutral-400">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-8">
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-white">Chỉnh sửa sản phẩm</h1>
              <p className="text-neutral-400 mt-1">Cập nhật thông tin sản phẩm</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Lưu thay đổi</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Thông tin cơ bản</h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: ChatGPT Plus 1 tháng"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Mô tả sản phẩm <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết về sản phẩm..."
                rows={4}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600 resize-none"
                required
              />
            </div>

            {/* Category & Status */}
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
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "active" | "inactive" })
                  }
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="active">Đang bán</option>
                  <option value="inactive">Ngừng bán</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Giá & Kho hàng</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Giá bán (₫) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="450000"
                  min="0"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Giá gốc (₫)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: Number(e.target.value) })
                  }
                  placeholder="500000"
                  min="0"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Số lượng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  placeholder="50"
                  min="0"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Ảnh sản phẩm</h2>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Upload ảnh hoặc nhập URL
              </label>
              <div className="flex gap-4">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
                <label className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {isUploading ? "Uploading..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg border border-neutral-700"
                />
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Tính năng nổi bật</h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="VD: Truy cập GPT-4 không giới hạn"
                className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Thêm
              </button>
            </div>

            {formData.features.length > 0 && (
              <ul className="space-y-2">
                {formData.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-neutral-800 rounded-lg"
                  >
                    <span className="text-neutral-300">• {feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
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
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
