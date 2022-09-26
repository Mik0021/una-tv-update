import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Static } from './../interfaces/static.model';

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  constructor(private http: HttpClient) {}
  getStaticPage(query: string | null) {
    // let params = new HttpParams().set('keyword', query);
    return this.http.get<Static>(
      `${environment.API_UNA}${environment.API_STATIC}/${query}`
    );
  }
}
