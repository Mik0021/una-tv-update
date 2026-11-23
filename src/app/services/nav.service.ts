import { httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { Nav } from 'src/app/interfaces/nav.model';
import { Pages } from 'src/app/interfaces/pages.model';
import { environment } from '../../environments/environment';

/** Pages that are linked elsewhere, not in the footer. */
const HIDDEN_FOOTER_PAGES = new Set([
  'pravila-kviza-i-audicije-za-kviz',
  'kako-nas-gledati',
  'obavestenje-o-obradi-podataka-o-licnosti-ucesnika-u-audiciji-za-kviz-jedno-pitanje',
]);

/** Router path for a menu item, by its type. */
function menuItemPath(item: { type: string; slug: string }): string {
  switch (item.type) {
    case 'page':
      return 'p/' + item.slug;
    case 'tag':
      return 'tag/' + item.slug;
    case 'personalities':
      return 'nasa-lica';
    case 'personality':
      return 'nasa-lica/' + item.slug;
    case 'program-schemas':
      return 'program';
    default:
      return item.slug;
  }
}

function withMenuPaths(nav: Nav): Nav {
  return {
    ...nav,
    data: nav.data.map((item) => ({
      ...item,
      slug: menuItemPath(item),
      children: item.children.map((child) => ({
        ...child,
        slug: menuItemPath(child),
      })),
    })),
  };
}

function footerPages(pages: Pages): Pages {
  return {
    ...pages,
    data: pages.data
      .filter((page) => !HIDDEN_FOOTER_PAGES.has(page.slug))
      .map((page) => ({ ...page, slug: 'p/' + page.slug })),
  };
}

/**
 * Site menu and footer pages, loaded once per app (per request on the server).
 * Values are undefined until loaded (or if loading fails).
 */
@Injectable({
  providedIn: 'root',
})
export class NavService {
  private readonly navResource = httpResource<Nav>(
    () => `${environment.API_UNA}${environment.API_NAV}`,
    { parse: (raw) => withMenuPaths(raw as Nav) },
  );
  private readonly pagesResource = httpResource<Pages>(
    () => `${environment.API_UNA}${environment.API_PAGES}`,
    { parse: (raw) => footerPages(raw as Pages) },
  );

  readonly nav = computed(() =>
    this.navResource.hasValue() ? this.navResource.value() : undefined,
  );

  readonly footerPages = computed(() =>
    this.pagesResource.hasValue() ? this.pagesResource.value() : undefined,
  );

  /** Whether the quiz is open; undefined until the menu has loaded. */
  readonly quizEnabled = computed(() => {
    const nav = this.nav();
    return nav ? !!nav.meta?.settings?.quiz_enabled : undefined;
  });
}
