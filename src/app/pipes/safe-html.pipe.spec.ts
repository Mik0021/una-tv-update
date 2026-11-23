import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  it('marks API HTML as trusted so embeds keep their scripts', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafeHtmlPipe());
    const html =
      '<div class="raw-html-embed"><script src="x.js"></script></div>';

    const trusted = pipe.transform(html);

    expect(
      TestBed.inject(DomSanitizer).sanitize(SecurityContext.HTML, trusted),
    ).toBe(html);
  });
});
