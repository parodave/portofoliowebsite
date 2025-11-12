// components/PostCard.tsx
import Link from "next/link";
import { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur transition hover:border-white/20">
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover} alt="" className="mb-3 h-44 w-full rounded-xl object-cover" />
      ) : null}
      <div className="flex items-center gap-3 text-xs text-white/60">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        <span>• {post.readingTime}</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">{post.title}</h3>
      {post.excerpt ? <p className="mt-1 text-sm text-white/70">{post.excerpt}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {(post.tags || []).map(t => (
          <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">{t}</span>
        ))}
      </div>
      <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm text-sky-300 hover:text-sky-200">
        Lire l’article →
      </Link>
    </article>
  );
}
