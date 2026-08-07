/** Prefix public assets with Vite base (needed for GitHub Pages). */
export function asset(path: string) {
  const clean = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}
