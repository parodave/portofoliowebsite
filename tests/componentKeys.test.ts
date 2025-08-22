import { describe, it, expect } from 'vitest';
import i18n from '../src/i18n';

const keys = [
  'hero.title',
  'hero.discoverKr',
  'hero.scroll',
  'about.title',
  'about.summary',
  'skills.title',
  'skills.subtitle',
  'projects.title',
  'projects.subtitle',
  'experience.title',
  'experience.subtitle',
  'contact.title',
  'contact.description',
  'resumeSelector.aria',
  'resumeSelector.choose',
  'chat.title',
  'chat.subtitle',
  'floatingAgentIA.open',
  'floatingAgentIA.close',
  'footer.rights',
  'contactForm.nameLabel',
  'contactForm.emailLabel',
  'contactForm.messageLabel',
  'contactForm.send'
];

describe('component translation keys', () => {
  it('resolve for both languages', () => {
    keys.forEach((key) => {
      const en = i18n.t(key, { lng: 'en' });
      const fr = i18n.t(key, { lng: 'fr' });
      expect(en).not.toBe(key);
      expect(fr).not.toBe(key);
    });
  });
});
