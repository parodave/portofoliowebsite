// app/sitemap.xml/route.ts
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.karimhammouche.com";
  const posts = getAllPosts();
  const urls = [
    "/", "/blog",
    ...posts.map(p => `/blog/${p.slug}`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${site}${u}</loc></url>`).join("")}
  </urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
