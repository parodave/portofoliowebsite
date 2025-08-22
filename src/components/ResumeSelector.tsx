import React from 'react';
import { useTranslation } from 'react-i18next';

const resumes = [
  { label: '🌐 Universel - CV (EN)', file: '/cv-universal.pdf' },
  { label: '🇫🇷 Français - CV', file: '/cv-fr.pdf' },
  { label: '🇬🇧 Anglais - Resume', file: '/cv-en.pdf' },
  { label: '🇸🇦 Arabe - السيرة الذاتية', file: '/cv-ar.pdf' },
];

const ResumeSelector: React.FC = () => {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = e.target.value;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      e.target.selectedIndex = 0;
    }
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="bg-zinc-800 text-white border border-zinc-600 rounded-md px-4 py-2"
      aria-label={t('resumeSelector.aria')}
    >
      <option value="" disabled>
        {t('resumeSelector.choose')}
      </option>
      {resumes.map(({ label, file }) => (
        <option key={file} value={file}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default ResumeSelector;
