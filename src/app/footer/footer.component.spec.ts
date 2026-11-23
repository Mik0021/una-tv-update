import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Pages } from 'src/app/interfaces/pages.model';
import { nav } from 'src/testing/fixtures';
import { NavService } from '../services/nav.service';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('renders the menu and the footer pages', () => {
    const pages: Pages = {
      data: [
        { resource_type: 'page', id: 1, title: 'O nama', slug: 'p/o-nama' },
      ],
    };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: NavService,
          useValue: { nav: signal(nav()), footerPages: signal(pages) },
        },
      ],
    });
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-footer-nav a')!.textContent!.trim()).toBe(
      'Naš program',
    );
    const pageLink = [...el.querySelectorAll('a')].find(
      (a) => a.textContent!.trim() === 'O nama',
    )!;
    expect(pageLink.getAttribute('href')).toBe('/p/o-nama');
  });
});
