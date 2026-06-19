export const FALLBACK_IMAGE_SRC =
  "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&q=60";

export function getImageSrc(
  src: string | null | undefined,
  size?: { w?: number; q?: number }
): string {
  const trimmed = src?.trim();

  if (!trimmed) {
    return FALLBACK_IMAGE_SRC;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    if (trimmed.includes("images.unsplash.com") && size) {
      const url = new URL(trimmed);
      if (size.w) url.searchParams.set("w", String(size.w));
      if (size.q) url.searchParams.set("q", String(size.q));
      return url.toString();
    }
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return FALLBACK_IMAGE_SRC;
}

export function getBlurDataUrl(): string {
  return "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAACQAQCdASoCAAEADv8AiBABE+gA/v38/f39/f39/f39/f0APwAA";
}
