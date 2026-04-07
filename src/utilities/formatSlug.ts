/**
 * Converts a blog title into a URL-safe slug.
 * e.g. "Hello World! This Is AI." → "hello-world-this-is-ai"
 */
export const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
