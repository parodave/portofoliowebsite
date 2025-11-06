"use client";

import React from "react";
import Link from "next/link";

export default function CvUniverselButton() {
  return (
    <Link
      href="/cv/cv-universel.pdf"
      download
      prefetch={false}
      aria-label="Télécharger le CV Universel"
      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-black text-white dark:bg-white dark:text-black ring-black/10 dark:ring-white/10"
    >
      Télécharger le CV Universel
    </Link>
  );
}
