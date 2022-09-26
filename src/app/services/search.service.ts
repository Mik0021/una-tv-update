import { Subject } from 'rxjs';
import { Search } from './../interfaces/search.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchRes = new Subject<Search>();

  searchRes$ = this.searchRes.asObservable();

  constructor(private http: HttpClient) {}

  search(query: string, currPage: number) {
    let params = new HttpParams()
      .set('q', query)
      .set('per_page', 24)
      .set('page', currPage);
    return this.http
      .post<Search>(`${environment.API_UNA}${environment.API_SEARCH}`, null, {
        params,
      })
      .subscribe((res: Search) => {
        this.searchRes.next(res);
      });
  }
}
