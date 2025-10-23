"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload } from "lucide-react";

interface PricingPlan {
  duration: string;
  price: number;
  discount?: number;
  popular?: boolean;
}

interface WarrantyPlan {
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

interface AccountInfo {
  description: string; // Rich text or markdown note about account
}

interface ProductForm {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  duration: string;
  category: string[];
  stock: number | string;
  image: string;
  logo: string;
  techLogo: string;
  badge: string;
  sold: number;
  status: "active" | "inactive";
  features: string[];
  pricingPlans: PricingPlan[];
  warrantyPlans: WarrantyPlan[];
  accountInfo?: AccountInfo;
  allowUpgrade: boolean;
}

export default function CreateProductPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    duration: "1 tháng",
    category: ["AI Tools"],
    stock: "unlimited",
    image: "",
    logo: "",
    techLogo: "",
    badge: "",
    sold: 0,
    status: "active",
    features: [],
    pricingPlans: [],
    warrantyPlans: [],
    allowUpgrade: false,
  });

  const [newFeature, setNewFeature] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [newPricingPlan, setNewPricingPlan] = useState({ duration: "", price: "", discount: "", popular: false });
  const [newWarrantyPlan, setNewWarrantyPlan] = useState({ duration: "", price: "", description: "", popular: false });
  const [accountNote, setAccountNote] = useState("");

  const categories = ["AI Chat", "AI Image", "Developer Tools", "Design", "Productivity", "Entertainment", "Video Editing", "Khác"];
  const stockOptions = ["unlimited", "made-to-order", "pre-order", "contact"];

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
        setFormData(prev => ({ ...prev, image: data.url }));
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
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addPricingPlan = () => {
    if (newPricingPlan.duration && newPricingPlan.price) {
      setFormData(prev => ({
        ...prev,
        pricingPlans: [...prev.pricingPlans, {
          duration: newPricingPlan.duration,
          price: Number(newPricingPlan.price),
          discount: Number(newPricingPlan.discount) || 0,
          popular: newPricingPlan.popular,
        }],
      }));
      setNewPricingPlan({ duration: "", price: "", discount: "", popular: false });
    }
  };

  const removePricingPlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.filter((_, i) => i !== index),
    }));
  };

  const addWarrantyPlan = () => {
    if (newWarrantyPlan.duration && newWarrantyPlan.description) {
      setFormData(prev => ({
        ...prev,
        warrantyPlans: [...prev.warrantyPlans, {
          duration: newWarrantyPlan.duration,
          price: Number(newWarrantyPlan.price) || 0,
          description: newWarrantyPlan.description,
          popular: newWarrantyPlan.popular,
        }],
      }));
      setNewWarrantyPlan({ duration: "", price: "", description: "", popular: false });
    }
  };

  const removeWarrantyPlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      warrantyPlans: prev.warrantyPlans.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      accountInfo: accountNote.trim() ? { description: accountNote } : undefined,
    };
    // TODO: Save to backend
    console.log("Saving product:", finalData);
    router.push("/aduconcachienxu/products");
  };

  const handleCancel = () => {
    router.back();
  };

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
              <h1 className="text-3xl font-bold text-white">Tạo sản phẩm mới</h1>
              <p className="text-neutral-400 mt-1">Điền thông tin để tạo sản phẩm mới</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Lưu sản phẩm</span>
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Danh mục <span className="text-red-500">*</span> (Có thể chọn nhiều)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.category.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm flex items-center gap-1">
                    {cat}
                    <button type="button" onClick={() => setFormData({ ...formData, category: formData.category.filter((_, i) => i !== idx) })} className="hover:text-red-300">×</button>
                  </span>
                ))}
              </div>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && !formData.category.includes(val)) {
                    setFormData({ ...formData, category: [...formData.category, val] });
                  }
                  e.target.value = "";
                }}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
              >
                <option value="">-- Chọn để thêm --</option>
                {categories.filter(c => !formData.category.includes(c)).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Logo & Badge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Tech Logo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.techLogo}
                  onChange={(e) => setFormData({ ...formData, techLogo: e.target.value })}
                  placeholder="VD: OpenAI, Midjourney"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Badge
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="VD: Phổ biến, Mới, Premium"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="active">Đang bán</option>
                  <option value="inactive">Ngừng bán</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Thời hạn mặc định
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="VD: 1 tháng, /tháng"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Giá & Kho hàng</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Giá bán (Cá) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="299 (VD: ChatGPT Plus 1 tháng)"
                  min="0"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Giá gốc (Cá)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  placeholder="350 (giá trước khi giảm)"
                  min="0"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Giảm giá (%)
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                  placeholder="15 (hiển thị badge -15%)"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Đã bán
                </label>
                <input
                  type="number"
                  value={formData.sold}
                  onChange={(e) => setFormData({ ...formData, sold: Number(e.target.value) })}
                  placeholder="2500 (hiển trên trang sản phẩm)"
                  min="0"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Kho hàng <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={typeof formData.stock === "string" ? formData.stock : "number"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "number") {
                      setFormData({ ...formData, stock: 0 });
                    } else {
                      setFormData({ ...formData, stock: val });
                    }
                  }}
                  className="px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="unlimited">Không giới hạn</option>
                  <option value="made-to-order">Làm theo đơn</option>
                  <option value="pre-order">Đặt trước</option>
                  <option value="contact">Liên hệ</option>
                  <option value="number">Số lượng cụ thể</option>
                </select>
                {typeof formData.stock === "number" && (
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    placeholder="50 (VD: 50 tài khoản còn lại)"
                    min="0"
                    className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Logo & Image */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Logo & Ảnh sản phẩm</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                URL Logo sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="/techlogos/openai.svg"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
                required
              />
              <p className="text-neutral-500 text-xs mt-1">Logo hiển thị trên card sản phẩm</p>
            </div>
            
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

          {/* Pricing Plans */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Gói thời hạn (Tùy chọn)</h2>
            <p className="text-neutral-400 text-sm">Thêm các gói thời hạn khác nhau cho sản phẩm</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newPricingPlan.duration}
                onChange={(e) => setNewPricingPlan({ ...newPricingPlan, duration: e.target.value })}
                placeholder="3 tháng (hoặc 1 năm, 6 tháng...)"
                className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <input
                type="number"
                value={newPricingPlan.price}
                onChange={(e) => setNewPricingPlan({ ...newPricingPlan, price: e.target.value })}
                placeholder="Giá: 850 Cá"
                className="w-32 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <input
                type="number"
                value={newPricingPlan.discount}
                onChange={(e) => setNewPricingPlan({ ...newPricingPlan, discount: e.target.value })}
                placeholder="Giảm: 5%"
                className="w-32 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={addPricingPlan}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                Thêm
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-neutral-300 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPricingPlan.popular}
                  onChange={(e) => setNewPricingPlan({ ...newPricingPlan, popular: e.target.checked })}
                  className="rounded"
                />
                Đánh dấu gói này là "Phổ biến"
              </label>
            </div>

            {formData.pricingPlans.length > 0 && (
              <ul className="space-y-2">
                {formData.pricingPlans.map((plan, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-neutral-800 rounded-lg"
                  >
                    <span className="text-neutral-300">
                      {plan.duration} - {plan.price} Cá {plan.discount ? `(-${plan.discount}%)` : ""} {plan.popular ? "(⭐ Phổ biến)" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePricingPlan(index)}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Warranty Plans */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Gói bảo hành (Tùy chọn)</h2>
            <p className="text-neutral-400 text-sm">Thêm các gói bảo hành cho sản phẩm</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newWarrantyPlan.duration}
                onChange={(e) => setNewWarrantyPlan({ ...newWarrantyPlan, duration: e.target.value })}
                placeholder="3 tháng"
                className="w-40 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <input
                type="number"
                value={newWarrantyPlan.price}
                onChange={(e) => setNewWarrantyPlan({ ...newWarrantyPlan, price: e.target.value })}
                placeholder="Giá: 30 Cá"
                className="w-32 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                value={newWarrantyPlan.description}
                onChange={(e) => setNewWarrantyPlan({ ...newWarrantyPlan, description: e.target.value })}
                placeholder="Hỗ trợ kỹ thuật, đổi tài khoản lỗi"
                className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={addWarrantyPlan}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                Thêm
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-neutral-300 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={newWarrantyPlan.popular}
                  onChange={(e) => setNewWarrantyPlan({ ...newWarrantyPlan, popular: e.target.checked })}
                  className="rounded"
                />
                Đánh dấu gói này là "Phổ biến"
              </label>
            </div>

            {formData.warrantyPlans.length > 0 && (
              <ul className="space-y-2">
                {formData.warrantyPlans.map((plan, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-neutral-800 rounded-lg"
                  >
                    <span className="text-neutral-300">
                      {plan.duration} - +{plan.price} Cá - {plan.description} {plan.popular ? "(⭐ Phổ biến)" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeWarrantyPlan(index)}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Account Info Note */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Ghi chú thông tin tài khoản (Tùy chọn)</h2>
            <p className="text-neutral-400 text-sm">
              Mô tả thông tin tài khoản mà khách hàng sẽ nhận (email, mật khẩu, 2FA, lưu ý...)
            </p>
            <textarea
              value={accountNote}
              onChange={(e) => setAccountNote(e.target.value)}
              placeholder="VD:\n\nPhương thức đăng nhập: Email & Password\n\nKhách hàng sẽ nhận:\n- Email tài khoản\n- Mật khẩu\n- Mã 2FA (Google Authenticator)\n- Email khôi phục\n\nLưu ý:\n- Không được đổi email tài khoản\n- Có thể đổi mật khẩu sau khi nhận\n- Hướng dẫn setup 2FA chi tiết"
              rows={10}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-600 resize-none font-mono text-sm"
            />
            <p className="text-neutral-500 text-xs">
              💡 Mẹo: Sử dụng dấu gạch đầu dòng (-) hoặc số để liệt kê cho dễ đọc
            </p>
          </div>

          {/* Allow Upgrade */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowUpgrade}
                onChange={(e) => setFormData({ ...formData, allowUpgrade: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              <div>
                <p className="text-white font-semibold">Cho phép nâng cấp tài khoản</p>
                <p className="text-neutral-400 text-sm">Người dùng có thể nâng cấp tài khoản hiện tại thay vì mua mới</p>
              </div>
            </label>
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
              <span>Tạo sản phẩm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
