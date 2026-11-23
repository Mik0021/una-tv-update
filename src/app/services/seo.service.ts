import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Share image used when a page has none of its own. */
export const DEFAULT_SHARE_IMAGE =
  'https://una-test-images.ha.rs/storage/images/2022/09/una.webp';

export interface PageSeo {
  /** Document title. */
  title: string;
  description: string;
  keywords: string;
  /** og:title and twitter:title. Defaults to `title`. */
  shareTitle?: string;
  /** og:image. Defaults to DEFAULT_SHARE_IMAGE (1920×1080). */
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  /** twitter:image. Defaults to `image`. */
  twitterImage?: string;
  type?: 'website' | 'article';
}

/**
 * Sets the same complete set of SEO tags on every page: title, description,
 * keywords, Open Graph, Twitter card and the canonical link. Setting every tag
 * each time means nothing is left over from the previous page during
 * client-side navigation.
 *
 * URLs come from `document.location`, which during SSR is the request URL
 * (scheme/host from the trusted X-Forwarded-* headers, see server.ts).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private document = inject(DOCUMENT);

  set(seo: PageSeo): void {
    const { href, host } = this.document.location;
    const shareTitle = seo.shareTitle ?? seo.title;
    const image = seo.image ?? DEFAULT_SHARE_IMAGE;

    this.titleService.setTitle(seo.title);
    this.name('description', seo.description);
    this.name('keywords', seo.keywords);

    this.property('og:title', shareTitle);
    this.property('og:description', seo.description);
    this.property('og:image', image);
    this.property('og:image:width', seo.imageWidth ?? '1920');
    this.property('og:image:height', seo.imageHeight ?? '1080');
    this.property('og:url', href);
    this.property('og:type', seo.type ?? 'website');

    this.name('twitter:card', 'summary_large_image');
    this.name('twitter:site', '@');
    this.name('twitter:creator', host);
    this.name('twitter:domain', host);
    this.name('twitter:title', shareTitle);
    this.name('twitter:description', seo.description);
    this.name('twitter:image', seo.twitterImage ?? image);

    this.setCanonical(href);
  }

  private name(name: string, content: string | null | undefined) {
    this.meta.updateTag({ name, content: content ?? '' });
  }

  private property(property: string, content: string | null | undefined) {
    this.meta.updateTag({ property, content: content ?? '' });
  }

  private setCanonical(href: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
