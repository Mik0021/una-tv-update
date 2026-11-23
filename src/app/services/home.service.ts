import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from 'src/app/interfaces/home.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  /** Home page sections. Call in an injection context. */
  home() {
    return httpResource<Home>(
      () => `${environment.API_UNA}${environment.API_HOME}`,
    );
  }
}
