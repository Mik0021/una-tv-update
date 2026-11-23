import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { Home } from 'src/app/interfaces/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);

  private home = new Subject<Home>();

  home$ = this.home.asObservable();

  getHomePage() {
    return this.http
      .get<Home>(`${environment.API_UNA}${environment.API_HOME}`)
      .subscribe((homeData) => {
        this.home.next(homeData);
      });
  }
}
