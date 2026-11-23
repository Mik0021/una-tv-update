import { Router } from '@angular/router';
import { goToPage, pageParam } from './paging';

describe('pageParam', () => {
  it('defaults to 1 for missing or invalid values', () => {
    for (const value of [undefined, null, '', 'abc', '0', '-2', '1.5', 0]) {
      expect(pageParam(value), String(value)).toBe(1);
    }
  });

  it('parses valid page numbers', () => {
    expect(pageParam('3')).toBe(3);
    expect(pageParam(7)).toBe(7);
  });
});

describe('goToPage', () => {
  const navigate = vi.fn();
  const router = { navigate } as unknown as Router;

  beforeEach(() => {
    navigate.mockReset();
    vi.spyOn(window, 'scrollTo').mockReturnValue(undefined);
  });

  it('sets p and keeps the other query params', () => {
    goToPage(router, 2);
    expect(navigate).toHaveBeenCalledWith([], {
      queryParams: { p: 2 },
      queryParamsHandling: 'merge',
    });
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('removes p for the first page', () => {
    goToPage(router, 1);
    expect(navigate).toHaveBeenCalledWith([], {
      queryParams: { p: null },
      queryParamsHandling: 'merge',
    });
  });
});
