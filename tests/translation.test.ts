import { describe, it, expect, vi, afterEach } from 'vitest';
import { translateText, LIBRETRANSLATE_URL } from '../src/utils/translation';

describe('translateText', () => {
  const originalFetch = global.fetch;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn> | undefined;

  afterEach(() => {
    consoleErrorSpy?.mockRestore();
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('returns translated text when API returns data', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ translatedText: 'Bonjour' }),
    } as Response;
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await translateText('Hello', 'en', 'fr');
    expect(global.fetch).toHaveBeenCalledWith(LIBRETRANSLATE_URL, expect.any(Object));
    expect(result).toBe('Bonjour');
  });

  it('falls back to original text on API failure', async () => {
    const mockResponse = { ok: false } as Response;
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await translateText('Hello', 'en', 'fr');
    expect(result).toBe('Hello');
  });

  it('returns original text on fetch error', async () => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new Error('network'));

    const result = await translateText('Hello', 'en', 'fr');
    expect(result).toBe('Hello');
  });
});
