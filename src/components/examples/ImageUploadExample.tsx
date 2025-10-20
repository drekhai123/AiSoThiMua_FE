"use client";

import { useState } from "react";
import ImageUpload from "@/components/ui/image-upload";

export default function ImageUploadExample() {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<string>("");

  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
    console.log("Avatar uploaded:", url);
  };

  const handleProductImageUpload = (url: string) => {
    setProductImageUrl(url);
    console.log("Product image uploaded:", url);
  };

  const handleError = (error: string) => {
    console.error("Upload error:", error);
    alert(error);
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Image Upload Examples
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avatar Upload */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Avatar Upload</h2>
            <ImageUpload
              onUpload={handleAvatarUpload}
              onError={handleError}
              currentImage={avatarUrl}
              placeholder="Chọn avatar"
              maxSize={2}
              className="mb-4"
            />
            {avatarUrl && (
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Uploaded URL:</p>
                <p className="text-green-400 text-xs break-all">{avatarUrl}</p>
              </div>
            )}
          </div>

          {/* Product Image Upload */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product Image Upload</h2>
            <ImageUpload
              onUpload={handleProductImageUpload}
              onError={handleError}
              currentImage={productImageUrl}
              placeholder="Chọn hình sản phẩm"
              maxSize={5}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
              className="mb-4"
            />
            {productImageUrl && (
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Uploaded URL:</p>
                <p className="text-green-400 text-xs break-all">{productImageUrl}</p>
              </div>
            )}
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Cách sử dụng:</h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>1. Thêm biến môi trường vào <code className="bg-slate-700 px-2 py-1 rounded">.env.local</code>:</p>
            <pre className="bg-slate-800 p-3 rounded text-xs overflow-x-auto">
              {`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset`}
            </pre>
            <p>2. Import và sử dụng component:</p>
            <pre className="bg-slate-800 p-3 rounded text-xs overflow-x-auto">
              {`import ImageUpload from "@/components/ui/image-upload";

<ImageUpload
  onUpload={(url) => console.log(url)}
  onError={(error) => console.error(error)}
  currentImage={existingImageUrl}
  placeholder="Chọn hình ảnh"
  maxSize={5}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
