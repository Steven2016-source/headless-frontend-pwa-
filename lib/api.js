export const WP_BASE = "http://localhost/headless-wp/wp-json/wp/v2";

export async function fetchPosts() {
  const res = await fetch(`${WP_BASE}/posts?_embed`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}
