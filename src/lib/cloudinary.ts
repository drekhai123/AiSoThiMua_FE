// Cloudinary configuration and utilities

export const CLOUDINARY_CONFIG = {
  cloudUrl: process.env.CLOUDINARY_URL,
};

export const validateCloudinaryConfig = () => {
  if (!CLOUDINARY_CONFIG.cloudUrl) {
    throw new Error('CLOUDINARY_URL environment variable is required');
  }
  return true;
};

// Client-side upload function using API route
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Upload failed');
  }

  return response.json();
};
