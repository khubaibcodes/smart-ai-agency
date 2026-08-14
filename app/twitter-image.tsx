/**
 * X / Twitter uses the same card as Open Graph. The `twitter-image` file
 * convention is separate from `opengraph-image`, so without this re-export the
 * summary_large_image card set in lib/seo.ts would have no image attached.
 */
export { default, alt, size, contentType } from "./opengraph-image";
