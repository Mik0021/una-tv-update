import { Router } from '@angular/router';
import { goToPage, pageParam } from './paging';

describe('pageParam', () => {
  it('defaults to 1 for missing or invalid values', () => {
    for (const value of [undefined, null, '', 'abc', '0', '-2', '1.5', 0]) {
      expect(pageParam(value)).withContext(String(value)).toBe(1);
    }
  });

  it('parses valid page numbers', () => {
    expect(pageParam('3')).toBe(3);
    expect(pageParam(7)).toBe(7);
  });
});

describe('goToPage', () => {
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    spyOn(window, 'scrollTo');
  });

  it('sets p and keeps the other query params', () => {
    goToPage(router, 2);
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { p: 2 },
      queryParamsHandling: 'merge',
    });
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('removes p for the first page', () => {
    goToPage(router, 1);
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { p: null },
      queryParamsHandling: 'merge',
    });
  });
});
