"use client";

import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Upload, Loader2, X, Image as ImageIcon } from "lucide-react";

interface CloudinaryUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string; // Required - specify upload folder (avatars, products, logos, reviews, issues, etc.)
  uploadPreset?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  showPreview?: boolean;
  previewWidth?: number;
  previewHeight?: number;
  className?: string;
}

export default function CloudinaryUpload({
  value = "",
  onChange,
  folder,
  uploadPreset,
  label = "Upload ảnh",
  required = false,
  placeholder = "Hoặc nhập URL trực tiếp...",
  showPreview = true,
  previewWidth = 120,
  previewHeight = 120,
  className = "",
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleClearImage = () => {
    onChange("");
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Upload Widget */}
      <div className="mb-3">
        <CldUploadWidget
          uploadPreset={uploadPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
          options={{
            folder: folder,
            maxFiles: 1,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "svg"],
            maxFileSize: 5000000, // 5MB
            sources: ["local", "url", "camera"],
            multiple: false,
          }}
          onSuccess={(result: any) => {
            setIsUploading(false);
            if (result?.info?.secure_url) {
              onChange(result.info.secure_url);
            }
          }}
          onQueuesEnd={(result: any) => {
            setIsUploading(false);
          }}
          onUpload={() => {
            setIsUploading(true);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={isUploading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${isUploading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                } text-white`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang upload...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Chọn ảnh từ máy tính</span>
                </>
              )}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* Manual URL Input */}
      {/* <div className="relative">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required={required && !value}
          disabled={isUploading}
        />
        {value && (
          <button
            type="button"
            onClick={handleClearImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-600 rounded transition-colors"
            title="Xóa"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        )}
      </div> */}

      {/* Helper Text */}
      <p className="text-gray-500 text-xs mt-2">
        💡 Upload ảnh (tối đa 5MB)
      </p>

      {/* Preview */}
      {showPreview && value && (
        <div className="mt-4 p-4 bg-slate-800 border border-slate-700 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Preview:</p>
          <div
            className="relative bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden"
            style={{ width: previewWidth, height: previewHeight }}
          >
            {value.includes("cloudinary.com") ? (
              <CldImage
                src={value}
                width={previewWidth}
                height={previewHeight}
                alt="Preview"
                crop="fill"
                gravity="auto"
                sizes="100vw"
              />
            ) : value.startsWith("http") || value.startsWith("/") ? (
              <img
                src={value}
                alt="Preview"
                width={previewWidth}
                height={previewHeight}
                className="object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span className="text-xs">Invalid URL</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
