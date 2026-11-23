import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { NavService } from './nav.service';

describe('NavService', () => {
  let service: NavService;
  let http: HttpTestingController;

  const item = (type: string, slug: string, children: unknown[] = []) => ({
    resource_type: 'menu_item',
    type,
    id: 1,
    title: slug,
    slug,
    sort_number: 1,
    color: '',
    children,
  });

  const flushNav = (quizEnabled: boolean) =>
    http.expectOne(`${environment.API_UNA}${environment.API_NAV}`).flush({
      data: [
        item('category', 'nas-program', [item('page', 'o-nama')]),
        item('tag', 'vesti'),
        item('personalities', 'anything'),
        item('personality', 'ana'),
        item('program-schemas', 'anything'),
      ],
      meta: { settings: { quiz_enabled: quizEnabled, theme: 'default' } },
    });

  /** httpResource settles a microtask after the response. */
  const settle = () => TestBed.inject(ApplicationRef).whenStable();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NavService);
    http = TestBed.inject(HttpTestingController);
    TestBed.tick();
  });

  it('maps menu items to router paths, including children', async () => {
    flushNav(true);
    http.expectOne(`${environment.API_UNA}${environment.API_PAGES}`).flush({
      data: [],
    });
    await settle();
    const nav = service.nav()!;
    expect(nav.data.map((i) => i.slug)).toEqual([
      'nas-program',
      'tag/vesti',
      'nasa-lica',
      'nasa-lica/ana',
      'program',
    ]);
    expect(nav.data[0].children[0].slug).toBe('p/o-nama');
  });

  it('exposes quizEnabled once the menu has loaded', async () => {
    expect(service.quizEnabled()).toBeUndefined();
    flushNav(false);
    http.expectOne(`${environment.API_UNA}${environment.API_PAGES}`).flush({
      data: [],
    });
    await settle();
    expect(service.quizEnabled()).toBe(false);
  });

  it('filters and prefixes footer pages', async () => {
    http.expectOne(`${environment.API_UNA}${environment.API_PAGES}`).flush({
      data: [
        { slug: 'o-nama', title: 'O nama' },
        { slug: 'kako-nas-gledati', title: 'Kako gledati' },
      ],
    });
    flushNav(true);
    await settle();
    expect(service.footerPages()!.data.map((p) => p.slug)).toEqual([
      'p/o-nama',
    ]);
  });
});
