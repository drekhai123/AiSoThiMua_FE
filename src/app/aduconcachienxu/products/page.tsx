"use client";

import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { Search, Plus, Edit2, Trash2, Package, AlertCircle, Loader2 } from "lucide-react";
import { getProducts, deleteProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import type { Product } from "@/types/models/product.model";
import type { Category } from "@/types/models/category.model";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products and categories on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories({ includeInactive: true }),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || "Không thể tải dữ liệu");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Match category by ID or first category name
    const productCategory = product.categories?.[0]?.id || product.category;
    const matchesCategory =
      categoryFilter === "all" || productCategory === categoryFilter;
    
    // Status filter (currently products don't have status field in backend, skip for now)
    const matchesStatus = statusFilter === "all";
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      await deleteProduct(selectedProduct._id);
      await fetchData(); // Reload data
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err: any) {
      alert(err.message || "Không thể xóa sản phẩm");
    }
  };

  const toggleStatus = async (productId: string) => {
    // TODO: Implement product status toggle when backend supports it
    alert("Tính năng đang phát triển");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-7 h-7 text-purple-400" />
            Quản lý Sản phẩm
          </h1>
          <p className="text-gray-400 mt-1">Tổng số: {products.length} sản phẩm</p>
        </div>
        <button
          onClick={() => window.location.href = "/aduconcachienxu/products/create"}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang bán</option>
            <option value="inactive">Ngừng bán</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
          <p className="text-gray-400">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-semibold mb-1">Lỗi tải dữ liệu</h3>
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={fetchData}
              className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const firstPlan = product.pricingPlans?.[0];
            const displayPrice = firstPlan?.price || product.price || 0;
            const displayCategory = product.categories?.[0]?.name || product.category || "Chưa phân loại";
            
            return (
              <div
                key={product._id || product.id || `product-${index}`}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-slate-700 flex items-center justify-center p-4">
                  {product.logo?.includes("cloudinary.com") ? (
                    <CldImage
                      src={product.logo}
                      width={200}
                      height={200}
                      alt={product.name}
                      crop="fill"
                      gravity="auto"
                      sizes="200px"
                    />
                  ) : (
                    <img
                      src={product.logo || "/placeholder.png"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  )}
                  {product.badge && (
                    <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/90 text-white border border-purple-400/50">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-blue-500">
                      {displayPrice.toLocaleString("vi-VN")} Cá
                    </span>
                    {firstPlan?.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        {firstPlan.originalPrice.toLocaleString("vi-VN")} Cá
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-neutral-400">Kho: {product.stock || "unlimited"}</span>
                    <span className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs">
                      {displayCategory}
                    </span>
                  </div>

                  {product.sold !== undefined && (
                    <div className="text-xs text-gray-400 mb-3">
                      Đã bán: {product.sold}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/aduconcachienxu/products/${product._id}/edit`}
                      className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      title="Sửa"
                    >
                      <Edit2 className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="flex-1 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-neutral-400">
            Thử thay đổi bộ lọc hoặc thêm sản phẩm mới
          </p>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedProduct && (
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
                Xác nhận xóa sản phẩm
              </h3>
              <p className="text-neutral-400 mb-6">
                Bạn có chắc chắn muốn xóa sản phẩm{" "}
                <span className="text-white font-semibold">
                  &ldquo;{selectedProduct.name}&rdquo;
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
