/**
 * Optional imagery per surface.
 *
 * Deliberately sparse: an image only earns its place when it is literal to the
 * content beside it. A handshake photo next to the WhatsApp tile is decoration
 * and makes the page look like stock-photo filler — those surfaces keep their
 * icon treatment instead.
 *
 * To enable one, drop the file in `public/images/` and add the entry below.
 * Anything absent from this map falls back to the icon rendering automatically,
 * so a missing file can never break the build.
 *
 * Source images should be exported to WebP before being added. Everything is
 * lazy-loaded except `HERO_MEDIA`, which is the LCP candidate and gets
 * `priority`.
 */

export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Hero visual — the robotic hand / human hand handshake.
 * Sits beside the agent console, not in place of it.
 */
export const HERO_MEDIA: MediaAsset | null = null;

/**
 * About / mission — the fingertip-touch image. Reflective, one point of
 * contact; fits the "humans and AI working together" narrative.
 */
export const ABOUT_MEDIA: MediaAsset | null = null;

/**
 * Per-service imagery, keyed by service id. Only ids present here render an
 * image; everything else uses the service icon.
 *
 * `rag` is the one service where a document metaphor is literal to the
 * feature, so the hands-pulling-glowing-documents image belongs there.
 */
export const SERVICE_MEDIA: Record<string, MediaAsset> = {};
