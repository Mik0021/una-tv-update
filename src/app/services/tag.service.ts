import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tag } from './../interfaces/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tag = new Subject<Tag>();

  tag$ = this.tag.asObservable();

  constructor(private http: HttpClient) {}
  getTag(query: string | null, currPage: number) {
    let params = new HttpParams().set('per_page', 24).set('page', currPage);
    return this.http
      .get<Tag>(`${environment.API_UNA}${environment.API_TAG}/${query}`, {
        params,
      })
      .subscribe((tag) => {
        this.tag.next(tag);
      });
  }
}
