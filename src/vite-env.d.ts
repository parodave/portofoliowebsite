/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_LIBRETRANSLATE_URL: string;
  readonly VITE_GA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
