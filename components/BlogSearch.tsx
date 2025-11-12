// components/BlogSearch.tsx
"use client";
import React from "react";

export default function BlogSearch() {
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const v = p.get("q");
    if (v) setQ(v);
  }, []);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = new URL(window.location.href);
    if (q) u.searchParams.set("q", q);
    else u.searchParams.delete("q");
    window.location.href = u.toString();
  };
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Rechercher un article…"
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <button className="rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-white hover:border-white/20">
        OK
      </button>
    </form>
  );
}
