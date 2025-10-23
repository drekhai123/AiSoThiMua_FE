"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  image: string;
  status: "active" | "inactive";
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD-001",
      name: "ChatGPT Plus 1 tháng",
      description: "Gói ChatGPT Plus 1 tháng, truy cập GPT-4, GPT-4o",
      price: 450000,
      originalPrice: 500000,
      category: "AI Tools",
      stock: 50,
      image: "https://placehold.co/200x200?text=ChatGPT",
      status: "active",
      createdAt: "2025-10-22",
    },
    {
      id: "PROD-002",
      name: "Midjourney Standard",
      description: "Gói Midjourney Standard - 200 generations/tháng",
      price: 850000,
      category: "AI Tools",
      stock: 30,
      image: "https://placehold.co/200x200?text=Midjourney",
      status: "active",
      createdAt: "2025-10-21",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedProduct) return;
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const toggleStatus = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? {
              ...p,
              status: p.status === "active" ? "inactive" : "active",
            }
          : p
      )
    );
  };

  const categories = ["AI Tools", "Software", "Hosting", "VPN"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý Sản phẩm</h1>
          <p className="text-neutral-400">Tổng số: {products.length} sản phẩm</p>
        </div>
        <button
          onClick={() => window.location.href = "/aduconcachienxu/products/create"}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
          />
        </div>
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-600"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Ngừng bán</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-colors"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-neutral-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
                  product.status === "active"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {product.status === "active" ? "Đang bán" : "Ngừng bán"}
              </span>
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
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    {product.originalPrice.toLocaleString("vi-VN")}₫
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-neutral-400">Kho: {product.stock}</span>
                <span className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded">
                  {product.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(product.id)}
                  className="flex-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors text-sm"
                >
                  {product.status === "active" ? "Tắt" : "Bật"}
                </button>
                <button
                  onClick={() => window.location.href = `/aduconcachienxu/products/${product.id}/edit`}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  title="Sửa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
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
                  "{selectedProduct.name}"
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
