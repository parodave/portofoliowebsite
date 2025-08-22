import { describe, it, expect } from 'vitest';
import { detectLanguage } from '../src/utils/language';

describe('detectLanguage', () => {
  it('detects french', () => {
    expect(detectLanguage('Bonjour, comment ça va?')).toBe('fr');
  });

  it('detects spanish', () => {
    expect(detectLanguage('Hola amigo, como estas?')).toBe('es');
  });

  it('detects english by default', () => {
    expect(detectLanguage('Hello there')).toBe('en');
  });

  it('detects japanese characters', () => {
    expect(detectLanguage('こんにちは')).toBe('ja');
  });
});
