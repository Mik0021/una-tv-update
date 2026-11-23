import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Search } from './../interfaces/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /** Search results (the API takes a POST). Call in an injection context. */
  search(query: () => string | undefined, page: () => number) {
    return httpResource<Search>(() => {
      const q = query();
      return q
        ? {
            url: `${environment.API_UNA}${environment.API_SEARCH}`,
            method: 'POST',
            params: { q, per_page: 24, page: page() },
          }
        : undefined;
    });
  }
}
