import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvProgram } from './../interfaces/tv-program.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const MAX_TV_DAYS = 7;

@Injectable({
  providedIn: 'root',
})
export class TvProgramService {
  private tvProgram = new Subject<TvProgram>();
  private tvProgramBih = new Subject<TvProgram>();

  tvProgram$ = this.tvProgram.asObservable();
  tvProgramBih$ = this.tvProgramBih.asObservable();

  constructor(private http: HttpClient) {}

  getTvProgram() {
    return this.http
      .get<TvProgram>(`${environment.API_UNA}${environment.API_TV_PROGRAM}`)
      .pipe(
        map((tvProg: TvProgram) => {
          if (tvProg.data.length > MAX_TV_DAYS) {
            tvProg.data = tvProg.data.slice(0, MAX_TV_DAYS);
          }
          return tvProg;
        })
      )
      .subscribe({
        next: (res: TvProgram) => {
          this.tvProgram.next(res);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  getTvProgramBih() {
    return this.http
      .get<TvProgram>(`${environment.API_TV_PROGRAM_BIH}`)
      .pipe(
        map((tvProg: TvProgram) => {
          if (tvProg.data.length > MAX_TV_DAYS) {
            tvProg.data = tvProg.data.slice(0, MAX_TV_DAYS);
          }
          return tvProg;
        })
      )
      .subscribe({
        next: (res: TvProgram) => {
          this.tvProgramBih.next(res);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
