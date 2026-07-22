/** Prefix a public-folder path with Vite's base (needed for GitHub Pages). */
export const assetUrl = (path: string): string => {
  const normalized = path.replace(/^\//, "")
  return `${import.meta.env.BASE_URL}${normalized}`
}
