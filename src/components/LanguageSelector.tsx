import i18n from "i18next";

const LanguageSelector = () => {
  const changeLanguage = (lang: "en" | "fr") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value as "en" | "fr")}
      className="bg-black text-white border px-2 py-1 rounded ms-4"
      aria-label="Select language"
    >
      <option value="fr">🇫🇷 Français</option>
      <option value="en">🇬🇧 English</option>
    </select>
  );
};

export default LanguageSelector;
