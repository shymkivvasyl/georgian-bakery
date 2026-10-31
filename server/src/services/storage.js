import { v2 as cloudinary } from 'cloudinary';

// Keys come from CLOUDINARY_URL in .env. secure: true = https links
cloudinary.config({ secure: true });

// Upload an image to Cloudinary and return its link.
// source can be a URL or a file path. Only this file knows about Cloudinary
// publicId - a fixed file name. Upload with the same name replaces the old file
export async function uploadImage(source, { folder = 'georgian-bakery/menu', publicId } = {}) {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    public_id: publicId,
    overwrite: true,
    invalidate: true,
  });
  return result.secure_url;
}
