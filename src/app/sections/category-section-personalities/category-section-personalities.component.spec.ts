import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { personality, section } from 'src/testing/fixtures';
import { CategorySectionPersonalitiesComponent } from './category-section-personalities.component';

describe('CategorySectionPersonalitiesComponent', () => {
  it('renders one slide per personality', () => {
    // jsdom can't run Swiper Element; the component logs and carries on.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(
      CategorySectionPersonalitiesComponent,
    );
    fixture.componentRef.setInput(
      'sectionData',
      section({
        tv_personalities: [
          personality(),
          personality({ id: 2, slug: 'david' }),
        ],
      }),
    );
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const links = [...el.querySelectorAll('swiper-slide a')].map((a) =>
      a.getAttribute('href'),
    );
    expect(links).toEqual(['/nasa-lica/ana-strizic', '/nasa-lica/david']);
  });
});
