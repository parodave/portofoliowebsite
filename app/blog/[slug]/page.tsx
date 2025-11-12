import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { MDXComponents } from "@/components/MDX";

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return <div className="mx-auto max-w-3xl px-4 py-16 text-white/80">Article introuvable.</div>;
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/blog" className="text-sm text-sky-300 hover:text-sky-200">← Retour au blog</Link>
      <header className="mt-4">
        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/60">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          <span>• {post.readingTime}</span>
          {(post.tags || []).map(t => (
            <a key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
              #{t}
            </a>
          ))}
        </div>
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt="" className="mt-4 rounded-xl border border-white/10" />
        ) : null}
      </header>

      <div className="prose prose-invert prose-neutral mt-8 max-w-none">
        {/* MDX RSC rendering */}
        {/* @ts-expect-error async RSC */}
        <MDXRemote
          source={post.content}
          components={MDXComponents as any}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolink, { behavior: "wrap" }]] } }}
        />
      </div>
    </article>
  );
}
