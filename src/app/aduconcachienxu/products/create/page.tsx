"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import { createProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import type { Category } from "@/types/models/category.model";
import type { CreateProductRequest } from "@/services/product.service";
import CloudinaryUpload from "@/components/upload/CloudinaryUpload";

interface PricingPlanForm {
  duration: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  planType: "NEW_ACCOUNT" | "UPGRADE";
  popular: boolean;
}

interface WarrantyPlanForm {
  duration: string;
  price: string;
  description: string;
  popular: boolean;
}

export default function CreateProductPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [badge, setBadge] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [sold, setSold] = useState(0);
  const [stock, setStock] = useState("unlimited");
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [warrantyPlans, setWarrantyPlans] = useState<any[]>([]);
  const [accountNote, setAccountNote] = useState("");

  // UI state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newFeature, setNewFeature] = useState("");
  const [newPlan, setNewPlan] = useState<PricingPlanForm>({
    duration: "",
    price: "",
    originalPrice: "",
    discount: "",
    planType: "NEW_ACCOUNT",
    popular: false,
  });
  const [newWarranty, setNewWarranty] = useState<WarrantyPlanForm>({
    duration: "",
    price: "",
    description: "",
    popular: false,
  });

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategories({ includeInactive: false });
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Không thể tải danh mục");
    } finally {
      setLoadingCategories(false);
    }
  };

  // Auto-generate slug from name
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  };

  // Add/Remove features
  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Add/Remove pricing plans
  const addPricingPlan = () => {
    if (newPlan.duration && newPlan.price) {
      setPricingPlans([
        ...pricingPlans,
        {
          duration: newPlan.duration,
          price: Number(newPlan.price),
          originalPrice: newPlan.originalPrice ? Number(newPlan.originalPrice) : undefined,
          discount: newPlan.discount ? Number(newPlan.discount) : undefined,
          planType: newPlan.planType,
          popular: newPlan.popular,
        },
      ]);
      setNewPlan({
        duration: "",
        price: "",
        originalPrice: "",
        discount: "",
        planType: "NEW_ACCOUNT",
        popular: false,
      });
    }
  };

  const removePricingPlan = (index: number) => {
    setPricingPlans(pricingPlans.filter((_, i) => i !== index));
  };

  // Add/Remove warranty plans
  const addWarrantyPlan = () => {
    if (newWarranty.duration && newWarranty.description) {
      setWarrantyPlans([
        ...warrantyPlans,
        {
          duration: newWarranty.duration,
          price: Number(newWarranty.price) || 0,
          description: newWarranty.description,
          popular: newWarranty.popular,
        },
      ]);
      setNewWarranty({
        duration: "",
        price: "",
        description: "",
        popular: false,
      });
    }
  };

  const removeWarrantyPlan = (index: number) => {
    setWarrantyPlans(warrantyPlans.filter((_, i) => i !== index));
  };

  // Parse account info from note
  const parseAccountInfo = (note: string) => {
    if (!note.trim()) return undefined;

    // Simple parsing - you can enhance this
    const lines = note.split("\n").filter(line => line.trim());
    return {
      loginMethod: "Email & Password",
      includes: lines.filter(line => line.startsWith("-")).map(line => line.substring(1).trim()),
      notes: lines.filter(line => !line.startsWith("-")),
    };
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (!slug.trim()) {
      alert("Vui lòng nhập slug");
      return;
    }
    if (!description.trim()) {
      alert("Vui lòng nhập mô tả");
      return;
    }
    if (!logo.trim()) {
      alert("Vui lòng nhập URL logo");
      return;
    }
    if (categoryIds.length === 0) {
      alert("Vui lòng chọn ít nhất một danh mục");
      return;
    }

    try {
      setLoading(true);

      const productData: CreateProductRequest = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        logo: logo.trim(),
        categoryIds,
        badge: badge.trim() || undefined,
        features: features.length > 0 ? features : undefined,
        sold: sold || 0,
        stock: stock,
        pricingPlans: pricingPlans.length > 0 ? pricingPlans : undefined,
        warrantyPlans: warrantyPlans.length > 0 ? warrantyPlans : undefined,
        accountInfo: parseAccountInfo(accountNote),
      };

      console.log('🚀 Request data:', JSON.stringify(productData, null, 2));
      await createProduct(productData);
      alert("Tạo sản phẩm thành công!");
      router.push("/aduconcachienxu/products");
    } catch (error: any) {
      console.error("Error creating product:", error);
      alert(error.message || "Không thể tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Tạo sản phẩm mới</h1>
              <p className="text-gray-400 mt-1">Điền thông tin để tạo sản phẩm mới</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Thông tin cơ bản</h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên sản phẩm <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="VD: ChatGPT Plus 1 tháng"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Slug (URL) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="chatgpt-plus-1-thang"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-gray-500 text-xs mt-1">Tự động tạo từ tên sản phẩm</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mô tả sản phẩm <span className="text-red-400">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về sản phẩm..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
            </div>

            {/* Logo */}
            <CloudinaryUpload
              value={logo}
              onChange={setLogo}
              folder="products"
              label="Logo sản phẩm"
              required
              showPreview
              previewWidth={120}
              previewHeight={120}
            />

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Danh mục <span className="text-red-400">*</span>
              </label>
              {loadingCategories ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tải danh mục...</span>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {categoryIds.map((catId) => {
                      const cat = categories.find(c => c.id === catId);
                      return cat ? (
                        <span
                          key={catId}
                          className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm flex items-center gap-2"
                        >
                          {cat.name}
                          <button
                            type="button"
                            onClick={() => setCategoryIds(categoryIds.filter(id => id !== catId))}
                            className="hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !categoryIds.includes(val)) {
                        setCategoryIds([...categoryIds, val]);
                      }
                      e.target.value = "";
                    }}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">-- Chọn để thêm --</option>
                    {categories
                      .filter(c => !categoryIds.includes(c.id))
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </div>

            {/* Badge & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Badge</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="VD: Phổ biến, Mới, Premium"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Kho hàng</label>
                <select
                  value={stock === 'unlimited' || stock === 'made-to-order' || stock === 'pre-order' ? stock : 'custom'}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'custom') {
                      setStock('0');
                    } else {
                      setStock(val);
                    }
                  }}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="unlimited">Không giới hạn</option>
                  <option value="made-to-order">Làm theo đơn</option>
                  <option value="pre-order">Đặt trước</option>
                  <option value="custom">Số lượng cụ thể</option>
                </select>
              </div>
            </div>

            {/* Stock Quantity Input (if custom) */}
            {stock !== 'unlimited' && stock !== 'made-to-order' && stock !== 'pre-order' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Số lượng trong kho</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min="0"
                  placeholder="Nhập số lượng"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Sold */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Đã bán</label>
              <input
                type="number"
                value={sold}
                onChange={(e) => setSold(Number(e.target.value))}
                min="0"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Gói giá (Tùy chọn)</h2>

            <div className="grid grid-cols-12 gap-2">
              <input
                type="text"
                value={newPlan.duration}
                onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                placeholder="3 tháng"
                className="col-span-3 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                placeholder="Giá (Cá)"
                className="col-span-2 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newPlan.planType}
                onChange={(e) => setNewPlan({ ...newPlan, planType: e.target.value as "NEW_ACCOUNT" | "UPGRADE" })}
                className="col-span-3 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="NEW_ACCOUNT">Tài khoản mới</option>
                <option value="UPGRADE">Nâng cấp</option>
              </select>
              <div className="col-span-2 flex items-center justify-center">
                <label className="flex items-center gap-1 text-gray-300 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPlan.popular}
                    onChange={(e) => setNewPlan({ ...newPlan, popular: e.target.checked })}
                    className="rounded"
                  />
                  Phổ biến
                </label>
              </div>
              <button
                type="button"
                onClick={addPricingPlan}
                className="col-span-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Thêm
              </button>
            </div>

            {pricingPlans.length > 0 && (
              <ul className="space-y-2">
                {pricingPlans.map((plan, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {plan.duration} - {plan.price} Cá ({plan.planType === "NEW_ACCOUNT" ? "Mới" : "Nâng cấp"})
                      {plan.popular && " ⭐"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePricingPlan(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Warranty Plans */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Gói bảo hành (Tùy chọn)</h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={newWarranty.duration}
                onChange={(e) => setNewWarranty({ ...newWarranty, duration: e.target.value })}
                placeholder="3 tháng"
                className="w-32 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                value={newWarranty.price}
                onChange={(e) => setNewWarranty({ ...newWarranty, price: e.target.value })}
                placeholder="30 Cá"
                className="w-28 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                value={newWarranty.description}
                onChange={(e) => setNewWarranty({ ...newWarranty, description: e.target.value })}
                placeholder="Mô tả bảo hành"
                className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={addWarrantyPlan}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Thêm
              </button>
            </div>

            {warrantyPlans.length > 0 && (
              <ul className="space-y-2">
                {warrantyPlans.map((plan, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {plan.duration} - +{plan.price} Cá - {plan.description}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeWarrantyPlan(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Features */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Tính năng nổi bật</h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="VD: Truy cập GPT-4 không giới hạn"
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Thêm
              </button>
            </div>

            {features.length > 0 && (
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-lg">
                    <span className="text-gray-300">• {feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Thông tin tài khoản (Tùy chọn)</h2>
            <textarea
              value={accountNote}
              onChange={(e) => setAccountNote(e.target.value)}
              placeholder="Mô tả thông tin tài khoản..."
              rows={6}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Tạo sản phẩm</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
