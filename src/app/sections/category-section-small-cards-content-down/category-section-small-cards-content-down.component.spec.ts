import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { section, tvShow } from 'src/testing/fixtures';
import { CategorySectionSmallCardsContentDownComponent } from './category-section-small-cards-content-down.component';

describe('CategorySectionSmallCardsContentDownComponent', () => {
  it('renders the category heading and one slide per show', () => {
    // jsdom can't run Swiper Element; the component logs and carries on.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(
      CategorySectionSmallCardsContentDownComponent,
    );
    fixture.componentRef.setInput(
      'sectionData',
      section({ tv_shows: [tvShow(), tvShow({ id: 2, slug: 'nina' })] }),
    );
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h2')!.textContent!.trim()).toBe('Emisije');
    expect(el.querySelector('h2')!.closest('a')!.getAttribute('href')).toBe(
      '/nas-program/emisije',
    );
    expect(el.querySelectorAll('swiper-slide').length).toBe(2);
    expect(el.querySelector('swiper-container')!.getAttribute('init')).toBe(
      'false',
    );
  });
});
