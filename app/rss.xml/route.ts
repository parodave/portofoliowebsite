// app/rss.xml/route.ts
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.karimhammouche.com";
  const items = posts.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt || ""}]]></description>
    </item>
  `).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>Blog — Karim Hammouche</title>
    <link>${site}</link>
    <description>RSS feed</description>
    ${items}
  </channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
