import i18n from '../i18n';

export function getCurrentLang(): 'fr' | 'en' {
  return i18n.language === 'fr' || i18n.language === 'en' ? i18n.language : 'fr';
}
