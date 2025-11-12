import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import BlogSearch from "@/components/BlogSearch";

export const revalidate = 60; // ISR

function filterPosts(q: string | null, tag: string | null) {
  const all = getAllPosts();
  return all.filter(p => {
    const okQ = q
      ? (p.title + " " + (p.excerpt || "") + " " + p.tags?.join(" ")).toLowerCase().includes(q.toLowerCase())
      : true;
    const okTag = tag ? (p.tags || []).map(t => t.toLowerCase()).includes(tag.toLowerCase()) : true;
    return okQ && okTag;
  });
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string; page?: string };
}) {
  const q = searchParams?.q ?? null;
  const tag = searchParams?.tag ?? null;
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const perPage = 8;

  const posts = filterPosts(q, tag);
  const total = posts.length;
  const slice = posts.slice((page - 1) * perPage, page * perPage);

  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        <p className="mt-1 text-white/70">Articles MDX, FR/EN, dark & minimal.</p>
        <div className="mt-4"><BlogSearch /></div>
        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map(([t, n]) => {
              const href = `/blog?tag=${encodeURIComponent(t)}` + (q ? `&q=${encodeURIComponent(q)}` : "");
              return (
                <a key={t} href={href} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80 hover:bg-white/20">
                  #{t} <span className="opacity-60">({n})</span>
                </a>
              );
            })}
          </div>
        ) : null}
      </header>

      {slice.length === 0 ? (
        <p className="text-white/70">Aucun article trouvé.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {slice.map(p => <PostCard key={p.slug} post={p} />)}
        </section>
      )}

      {/* Pagination */}
      {total > perPage && (
        <nav className="mt-8 flex items-center justify-center gap-2 text-sm text-white/80">
          {Array.from({ length: Math.ceil(total / perPage) }, (_, i) => {
            const n = i + 1;
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (tag) params.set("tag", tag);
            params.set("page", String(n));
            const href = `/blog?${params.toString()}`;
            const active = n === page;
            return (
              <a key={n} href={href} className={`rounded-md px-3 py-1 ${active ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}>
                {n}
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Blog — Karim Hammouche",
    description: "Articles techniques, notes de parcours, et mises à jour.",
    openGraph: {
      title: "Blog — Karim Hammouche",
      description: "Articles techniques, notes de parcours, et mises à jour.",
      type: "website",
      url: "/blog",
    },
  };
}
