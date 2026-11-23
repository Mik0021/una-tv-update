import { Nav } from 'src/app/interfaces/nav.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pages } from '../interfaces/pages.model';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private http = inject(HttpClient);

  private allNav = new Subject<Nav>();
  private footerPages = new Subject<Pages>();
  private quizEnabled = new BehaviorSubject<boolean | undefined>(undefined);

  allNav$ = this.allNav.asObservable();
  footerPages$ = this.footerPages.asObservable();
  quizEnabled$ = this.quizEnabled.asObservable();

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
        if (nav.meta?.settings?.quiz_enabled) {
          this.quizEnabled.next(true);
        } else {
          this.quizEnabled.next(false);
        }
      });
  }

  getFooterPages() {
    return this.http
      .get<Pages>(`${environment.API_UNA}${environment.API_PAGES}`)
      .pipe(
        map((data) => {
          data.data = data.data.filter((page) => {
            return (
              page.slug !== 'pravila-kviza-i-audicije-za-kviz' &&
              page.slug !== 'kako-nas-gledati' &&
              page.slug !==
                'obavestenje-o-obradi-podataka-o-licnosti-ucesnika-u-audiciji-za-kviz-jedno-pitanje'
            );
          });

          return data;
        }),
      )
      .subscribe((pages: Pages) => {
        pages.data.forEach((e) => {
          e.slug = 'p/' + e.slug;
        });
        this.footerPages.next(pages);
      });
  }
}
