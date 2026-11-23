import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Static } from './../interfaces/static.model';

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  /** A static page (`/p/:static`). Call in an injection context. */
  page(slug: () => string | undefined) {
    return httpResource<Static>(() => {
      const page = slug();
      return page
        ? `${environment.API_UNA}${environment.API_STATIC}/${page}`
        : undefined;
    });
  }
}
