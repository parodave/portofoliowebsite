export const LIBRETRANSLATE_URL =
  import.meta.env.VITE_LIBRETRANSLATE_URL || 'https://libretranslate.de/translate';

export async function translateText(
  text: string,
  fromLang: string,
  toLang: string,
): Promise<string> {
  try {
    const libreResponse = await fetch(LIBRETRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: toLang,
        format: 'text',
      }),
    });

    if (libreResponse.ok) {
      const libreData = await libreResponse.json();
      if (libreData.translatedText && libreData.translatedText.trim()) {
        return libreData.translatedText.trim();
      }
    }

    return text;
  } catch (error) {
    console.error('❌ Erreur de traduction:', error);
    return text;
  }
}
