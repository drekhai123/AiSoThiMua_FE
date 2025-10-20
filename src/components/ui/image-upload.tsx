"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  onError?: (error: string) => void;
  currentImage?: string;
  placeholder?: string;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
}

interface UploadProgress {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress?: number;
  message?: string;
}

export default function ImageUpload({
  onUpload,
  onError,
  currentImage,
  placeholder = "Chọn hình ảnh",
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className = "",
  disabled = false
}: ImageUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ status: 'idle' });
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      const error = `Chỉ chấp nhận file: ${acceptedTypes.map(type => type.split('/')[1]).join(', ')}`;
      setUploadProgress({ status: 'error', message: error });
      onError?.(error);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      const error = `File quá lớn. Kích thước tối đa: ${maxSize}MB`;
      setUploadProgress({ status: 'error', message: error });
      onError?.(error);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload via API route
    setUploadProgress({ status: 'uploading', progress: 0 });

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev.status === 'uploading' && prev.progress !== undefined) {
            const newProgress = Math.min(prev.progress + Math.random() * 30, 90);
            return { ...prev, progress: newProgress };
          }
          return prev;
        });
      }, 200);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress({ status: 'uploading', progress: 100 });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();

      setUploadProgress({ status: 'success', message: 'Upload thành công!' });
      onUpload(data.url);

      // Clear success message after 2 seconds
      setTimeout(() => {
        setUploadProgress({ status: 'idle' });
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi upload. Vui lòng thử lại.';
      setUploadProgress({ status: 'error', message: errorMessage });
      onError?.(errorMessage);
    }
  }, [acceptedTypes, maxSize, onUpload, onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect, disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setUploadProgress({ status: 'idle' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadProgress.status) {
      case 'uploading':
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Upload className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (uploadProgress.status) {
      case 'uploading':
        return 'Đang upload...';
      case 'success':
        return 'Upload thành công!';
      case 'error':
        return 'Upload thất bại';
      default:
        return placeholder;
    }
  };

  const getStatusColor = () => {
    switch (uploadProgress.status) {
      case 'uploading':
        return 'border-blue-500 bg-blue-500/10';
      case 'success':
        return 'border-green-500 bg-green-500/10';
      case 'error':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-slate-600 bg-slate-800/50';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${getStatusColor()}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500 hover:bg-purple-500/5'}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {preview ? (
          <div className="relative">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center">
              {getStatusIcon()}
            </div>
            <div>
              <p className="text-white font-medium mb-1">
                {getStatusText()}
              </p>
              <p className="text-gray-400 text-sm">
                {uploadProgress.status === 'uploading'
                  ? 'Vui lòng chờ trong giây lát...'
                  : 'Kéo thả file vào đây hoặc click để chọn'
                }
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {acceptedTypes.map(type => type.split('/')[1]).join(', ').toUpperCase()} • Tối đa {maxSize}MB
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {uploadProgress.status === 'uploading' && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Đang upload...</span>
              <span className="text-white font-semibold">{Math.round(uploadProgress.progress || 0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${uploadProgress.progress || 0}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Status Message */}
        {uploadProgress.message && (
          <div className={`mt-3 text-sm ${uploadProgress.status === 'success' ? 'text-green-400' :
            uploadProgress.status === 'error' ? 'text-red-400' :
              'text-gray-400'
            }`}>
            {uploadProgress.message}
          </div>
        )}
      </div>
    </div>
  );
}
