// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt?: string;
  date: string; // ISO
  tags?: string[];
  cover?: string;
  draft?: boolean;
  lang?: "fr" | "en";
};
export type Post = PostFrontmatter & {
  content: string;
  readingTime: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllSlugs() {
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): Post | null {
  const files = getAllSlugs();
  const fname = files.find(f => f.replace(/\.mdx$/, "") === slug);
  if (!fname) return null;
  const full = path.join(POSTS_DIR, fname);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (fm.draft) return null;
  const rt = readingTime(content);
  return {
    ...fm,
    content,
    readingTime: rt.text,
  };
}

export function getAllPosts() {
  const files = getAllSlugs();
  const posts: Post[] = [];
  for (const file of files) {
    const full = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    if (fm.draft) continue;
    const rt = readingTime(content);
    posts.push({ ...fm, content, readingTime: rt.text });
  }
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllTags() {
  const t = new Map<string, number>();
  for (const p of getAllPosts()) {
    (p.tags || []).forEach(tag => t.set(tag, (t.get(tag) || 0) + 1));
  }
  return Array.from(t.entries()).sort((a, b) => b[1] - a[1]);
}
