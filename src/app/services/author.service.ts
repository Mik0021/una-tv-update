import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../interfaces/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private author = new Subject<Author>();

  author$ = this.author.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthor(query: string | null, currPage: number) {
    let params = new HttpParams().set('per_page', 24).set('page', currPage);
    return this.http
      .get<Author>(`${environment.API_UNA}${environment.API_AUTHOR}/${query}`, {
        params,
      })
      .subscribe(
        (author) => {
          this.author.next(author);
        },
        (error: any) => {
          this.router.navigate(['404']);
        }
      );
  }
}
