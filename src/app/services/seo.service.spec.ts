import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_SHARE_IMAGE, SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let doc: Document;

  const meta = (attr: 'name' | 'property', key: string) =>
    doc.head.querySelector(`meta[${attr}="${key}"]`)?.getAttribute('content');

  beforeEach(() => {
    service = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
    doc.head.querySelector('link[rel="canonical"]')?.remove();
  });

  it('sets title, description, Open Graph, Twitter and canonical', () => {
    service.set({
      title: 'Naslov',
      description: 'Opis',
      keywords: 'a, b',
      shareTitle: 'Deljeni naslov',
      type: 'article',
    });
    const href = doc.location.href;

    expect(doc.title).toBe('Naslov');
    expect(meta('name', 'description')).toBe('Opis');
    expect(meta('name', 'keywords')).toBe('a, b');
    expect(meta('property', 'og:title')).toBe('Deljeni naslov');
    expect(meta('property', 'og:image')).toBe(DEFAULT_SHARE_IMAGE);
    expect(meta('property', 'og:image:width')).toBe('1920');
    expect(meta('property', 'og:url')).toBe(href);
    expect(meta('property', 'og:type')).toBe('article');
    expect(meta('name', 'twitter:title')).toBe('Deljeni naslov');
    expect(meta('name', 'twitter:image')).toBe(DEFAULT_SHARE_IMAGE);
    expect(doc.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(
      doc.head.querySelector('link[rel="canonical"]')!.getAttribute('href'),
    ).toBe(href);
  });

  it('replaces values from a previous page and reuses the canonical link', () => {
    service.set({
      title: 'Prva',
      description: 'x',
      keywords: 'x',
      image: 'https://example.com/a.webp',
      twitterImage: 'https://example.com/t.webp',
    });
    service.set({ title: 'Druga', description: 'y', keywords: 'y' });

    expect(meta('property', 'og:title')).toBe('Druga');
    expect(meta('property', 'og:image')).toBe(DEFAULT_SHARE_IMAGE);
    expect(meta('name', 'twitter:image')).toBe(DEFAULT_SHARE_IMAGE);
    expect(meta('property', 'og:type')).toBe('website');
    expect(doc.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
  });
});
