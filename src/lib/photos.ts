/**
 * Photo lookup by slug. Every content file names images by slug so that a
 * replaced photograph is one file swap, and a missing one degrades to a
 * placeholder instead of breaking the build.
 */
import type { ImageMetadata } from 'astro';
import placeholder from '../assets/placeholder.jpg';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const slug = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  bySlug.set(slug, mod.default);
}

export function hasPhoto(slug: string): boolean {
  return bySlug.has(slug);
}

/** Returns the image for a slug, or the placeholder when it is not on disk yet. */
export function photo(slug: string): ImageMetadata {
  return bySlug.get(slug) ?? (placeholder as unknown as ImageMetadata);
}

export function photoSlugs(): string[] {
  return [...bySlug.keys()].sort();
}
