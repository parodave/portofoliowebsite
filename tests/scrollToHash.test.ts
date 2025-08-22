import { JSDOM } from 'jsdom';
import { describe, it, expect } from 'vitest';

function scrollToHash(hash: string, document: Document) {
  if (hash) {
    const id = hash.substring(1);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}

describe('scrollToHash', () => {
  it('scrolls to the element if it exists', () => {
    const dom = new JSDOM('<!DOCTYPE html><section id="hero"></section>');
    const { document } = dom.window;
    let scrolled = false;
    document.getElementById('hero')!.scrollIntoView = () => {
      scrolled = true;
    };

    scrollToHash('#hero', document);
    expect(scrolled).toBe(true);
  });
});
