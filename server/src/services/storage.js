import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ secure: true });

export async function uploadImage(source, folder = 'georgian-bakery/menu') {
  const result = await cloudinary.uploader.upload(source, { folder });
  return result.secure_url;
}
