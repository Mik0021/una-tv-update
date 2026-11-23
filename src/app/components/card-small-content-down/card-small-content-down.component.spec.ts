import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { category, tvShow } from 'src/testing/fixtures';
import { CardSmallContentDownComponent } from './card-small-content-down.component';

describe('CardSmallContentDownComponent', () => {
  const render = (show = tvShow()) => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(CardSmallContentDownComponent);
    fixture.componentRef.setInput('articleData', show);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('links to the show under its parent category', () => {
    const el = render();
    expect(el.querySelector('a')!.getAttribute('href')).toBe(
      '/nas-program/emisije/holivudiranje',
    );
    expect(el.querySelector('h2')!.textContent!.trim()).toBe('Holivudiranje');
  });

  it('links directly under a top-level category', () => {
    const el = render(tvShow({ tv_category: category({ slug: 'vesti' }) }));
    expect(el.querySelector('a')!.getAttribute('href')).toBe(
      '/vesti/holivudiranje',
    );
  });

  it('builds the srcset from the thumbnails', () => {
    const img = render().querySelector('img')!;
    expect(img.getAttribute('srcset')).toBe(
      'https://img.test/144.webp 175w, https://img.test/345.webp',
    );
  });
});
