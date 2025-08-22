import { describe, it, expect } from 'vitest';
import { askFallbackAI } from '../src/utils/fallbackAI';

const enGreetings = ['Hello! How can I help you?', 'Hi there! What can I do for you?'];
const frGreetings = ['Bonjour ! Comment puis-je vous aider ?', 'Salut ! Que puis-je faire pour vous ?'];
const esGreetings = ['¡Hola! ¿Cómo puedo ayudarte?', '¡Buenos días! ¿En qué puedo asistirte?'];

describe('askFallbackAI', () => {
  it('returns an English greeting', () => {
    const result = askFallbackAI('Hello');
    expect(enGreetings).toContain(result);
  });

  it('returns a French greeting', () => {
    const result = askFallbackAI('Bonjour');
    expect(frGreetings).toContain(result);
  });

  it('returns a Spanish greeting', () => {
    const result = askFallbackAI('Hola');
    expect(esGreetings).toContain(result);
  });
});
