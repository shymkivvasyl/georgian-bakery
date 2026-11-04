type ImageOptions = {
  url: string;
  width: number;
};

export function getOptimizedImage({ url, width }: ImageOptions) {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}
