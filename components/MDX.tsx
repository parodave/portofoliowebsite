// components/MDX.tsx
"use client";
import React from "react";

export const MDXComponents = {
  img: (props: any) => (
    <img {...props} className={"my-6 rounded-xl border border-white/10"} loading="lazy" />
  ),
  a: (props: any) => (
    <a {...props} className="underline underline-offset-4 hover:opacity-90" />
  ),
  // ajouter ici d'autres composants MDX si besoin
};
