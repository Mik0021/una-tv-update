import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Static } from './../interfaces/static.model';

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  private http = inject(HttpClient);

  getStaticPage(query: string | null) {
    // let params = new HttpParams().set('keyword', query);
    return this.http.get<Static>(
      `${environment.API_UNA}${environment.API_STATIC}/${query}`,
    );
  }
}
