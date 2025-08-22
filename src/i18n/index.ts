import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr from "./fr.json";
import en from "./en.json";
import frProjects from "./projects/fr.json";
import enProjects from "./projects/en.json";

export const resources = {
  fr: { translation: fr, projects: frProjects },
  en: { translation: en, projects: enProjects },
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "fr",
    fallbackLng: "fr",
    ns: ["translation", "projects"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
