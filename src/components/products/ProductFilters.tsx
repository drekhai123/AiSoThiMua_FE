"use client";

import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductFiltersProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onTechLogoChange: (techLogo: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  categories: string[];
  techLogos: Array<{ name: string; logo: string }>;
}

const ProductFilters = ({
  onSearchChange,
  onCategoryChange,
  onTechLogoChange,
  onPriceRangeChange,
  categories,
  techLogos,
}: ProductFiltersProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTechLogo, setSelectedTechLogo] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleTechLogoChange = (techLogo: string) => {
    setSelectedTechLogo(techLogo);
    onTechLogoChange(techLogo);
  };

  const handlePriceFilter = () => {
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    onPriceRangeChange(min, max);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedTechLogo("all");
    setMinPrice("");
    setMaxPrice("");
    onSearchChange("");
    onCategoryChange("all");
    onTechLogoChange("all");
    onPriceRangeChange(0, Infinity);
  };

  return (
    <aside className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-fit sticky top-24">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Bộ lọc</h2>
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-4 h-4 mr-1" />
            Xóa
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="h-px bg-slate-700" />

        {/* Category Filter */}
        <div>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full text-white font-semibold mb-3 hover:text-purple-400 transition-colors"
          >
            <span>Danh mục</span>
            {showCategories ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showCategories && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedCategory === "all"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                  : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                  }`}
              >
                Tất cả
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-700" />

        {/* Tech Logo Filter */}
        <div>
          <button
            onClick={() => setShowBrands(!showBrands)}
            className="flex items-center justify-between w-full text-white font-semibold mb-3 hover:text-purple-400 transition-colors"
          >
            <span>Thương hiệu</span>
            {showBrands ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showBrands && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTechLogoChange("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedTechLogo === "all"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                  : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                  }`}
              >
                Tất cả
              </button>
              {techLogos.map((tech) => (
                <button
                  key={tech.name}
                  onClick={() => handleTechLogoChange(tech.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedTechLogo === tech.name
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  <div className="relative w-4 h-4 flex-shrink-0">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  <span className="truncate">{tech.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-700" />

        {/* Price Range Filter */}
        <div>
          <button
            onClick={() => setShowPrice(!showPrice)}
            className="flex items-center justify-between w-full text-white font-semibold mb-3 hover:text-purple-400 transition-colors"
          >
            <span>Khoảng giá</span>
            {showPrice ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showPrice && (
            <div className="space-y-3">
              {/* Quick Price Options */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                    onPriceRangeChange(0, Infinity);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${minPrice === "" && maxPrice === ""
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => {
                    setMinPrice("0");
                    setMaxPrice("200");
                    onPriceRangeChange(0, 200);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${minPrice === "0" && maxPrice === "200"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  {"< 200 Cá"}
                </button>
                <button
                  onClick={() => {
                    setMinPrice("200");
                    setMaxPrice("400");
                    onPriceRangeChange(200, 400);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${minPrice === "200" && maxPrice === "400"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  200 - 400 Cá
                </button>
                <button
                  onClick={() => {
                    setMinPrice("400");
                    setMaxPrice("600");
                    onPriceRangeChange(400, 600);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${minPrice === "400" && maxPrice === "600"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  400 - 600 Cá
                </button>
                <button
                  onClick={() => {
                    setMinPrice("600");
                    setMaxPrice("");
                    onPriceRangeChange(600, Infinity);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${minPrice === "600" && maxPrice === ""
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-700/50 text-gray-300 border-slate-600 hover:border-purple-500 hover:bg-slate-700"
                    }`}
                >
                  {"> 600 Cá"}
                </button>
              </div>

              {/* Custom Price Range */}
              <div className="pt-2">
                <label className="text-xs text-gray-400 mb-2 block">Tùy chỉnh</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Từ (Cá)"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    suppressHydrationWarning
                  />
                  <input
                    type="number"
                    placeholder="Đến (Cá)"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    suppressHydrationWarning
                  />
                  <Button
                    onClick={handlePriceFilter}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters;
