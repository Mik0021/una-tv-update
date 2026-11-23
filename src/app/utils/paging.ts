import { Router } from '@angular/router';

/** Input transform for the `p` query param: 1 for missing/invalid values. */
export function pageParam(value: unknown): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

/**
 * Pagination click: put the page in the `p` query param (removed for page 1,
 * other query params kept) and scroll to the top. Pages derive their request
 * from the `p` input, so this is all that's needed to load the page.
 */
export function goToPage(router: Router, page: number): void {
  router.navigate([], {
    queryParams: { p: page > 1 ? page : null },
    queryParamsHandling: 'merge',
  });
  window.scrollTo(0, 0);
}
