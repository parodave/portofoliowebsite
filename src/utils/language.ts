export const SUPPORTED_LANGUAGES = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  th: { name: 'ไทย', flag: '🇹🇭' },
};

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export function detectLanguage(text: string): SupportedLanguage {
  const lowerText = text.toLowerCase();

  const frenchWords = ['le', 'la', 'et', 'est', 'un', 'une', 'pour', 'dans', 'que', 'qui', 'comment', 'quel', 'bonjour', 'merci'];
  const spanishWords = ['el', 'la', 'y', 'es', 'un', 'una', 'para', 'en', 'que', 'hola', 'gracias', 'como', 'donde'];
  const englishWords = ['the', 'and', 'is', 'a', 'an', 'for', 'in', 'that', 'hello', 'thank', 'how', 'what'];

  const frenchPattern = /[éèàêùçœîôâû]/i;
  const spanishPattern = /[ñáéíóúü]/i;
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  const chinesePattern = /[\u4E00-\u9FFF]/;
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const thaiPattern = /[\u0E00-\u0E7F]/;

  if (japanesePattern.test(text)) return 'ja';
  if (chinesePattern.test(text)) return 'zh';
  if (arabicPattern.test(text)) return 'ar';
  if (thaiPattern.test(text)) return 'th';

  const frenchScore =
    frenchWords.filter((word) => lowerText.includes(word)).length +
    (frenchPattern.test(text) ? 2 : 0);
  const spanishScore =
    spanishWords.filter((word) => lowerText.includes(word)).length +
    (spanishPattern.test(text) ? 2 : 0);
  const englishScore = englishWords.filter((word) => lowerText.includes(word)).length;

  if (frenchScore > spanishScore && frenchScore > englishScore) return 'fr';
  if (spanishScore > englishScore) return 'es';

  return 'en';
}
