const CLOUDINARY_HOST = "res.cloudinary.com";

export function getOptimizedCloudinaryUrl(
  url: string,
  options: { width?: number; quality?: number; crop?: "fill" | "fit" } = {},
) {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== CLOUDINARY_HOST) return url;

    const width = options.width ?? 1200;
    const quality = options.quality ?? 75;
    const crop = options.crop ?? "fill";
    const transform = `f_auto,q_${quality},c_${crop},w_${width}`;

    const marker = "/upload/";
    const idx = parsed.pathname.indexOf(marker);
    if (idx === -1) return url;

    const prefix = parsed.pathname.slice(0, idx + marker.length);
    const suffix = parsed.pathname.slice(idx + marker.length);
    parsed.pathname = `${prefix}${transform}/${suffix}`;
    return parsed.toString();
  } catch {
    return url;
  }
}

