import { Nav } from 'src/app/interfaces/nav.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pages } from '../interfaces/pages.model';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private allNav = new Subject<Nav>();
  private footerPages = new Subject<Pages>();

  allNav$ = this.allNav.asObservable();
  footerPages$ = this.footerPages.asObservable();
  constructor(private http: HttpClient) {}

  getNav() {
    return this.http
      .get<Nav>(`${environment.API_UNA}${environment.API_NAV}`)
      .subscribe((nav: Nav) => {
        nav.data.forEach((e) => {
          if (e.type === 'page') {
            e.slug = 'p/' + e.slug;
          } else if (e.type === 'tag') {
            e.slug = 'tag/' + e.slug;
          } else if (e.type === 'personalities') {
            e.slug = 'nasa-lica';
          } else if (e.type === 'personality') {
            e.slug = 'nasa-lica/' + e.slug;
          } else if (e.type === 'program-schemas') {
            e.slug = 'program';
          }
          e.children.forEach((el) => {
            if (el.type === 'page') {
              el.slug = 'p/' + el.slug;
            } else if (el.type === 'tag') {
              el.slug = 'tag/' + el.slug;
            } else if (el.type === 'personalities') {
              el.slug = 'nasa-lica';
            } else if (el.type === 'personality') {
              el.slug = 'nasa-lica/' + el.slug;
            } else if (el.type === 'program-schemas') {
              el.slug = 'program';
            }
          });
        });
        this.allNav.next(nav);
      });
  }

  getFooterPages() {
    return this.http
      .get<Pages>(`${environment.API_UNA}${environment.API_PAGES}`)
      .subscribe((pages: Pages) => {
        pages.data.forEach((e) => {
          e.slug = 'p/' + e.slug;
        });
        this.footerPages.next(pages);
      });
  }
}
