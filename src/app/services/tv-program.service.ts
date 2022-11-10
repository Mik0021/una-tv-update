import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvProgram } from './../interfaces/tv-program.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TvProgramService {
  private tvProgram = new Subject<TvProgram>();
  private tvProgramBih = new Subject<TvProgram>();

  tvProgram$ = this.tvProgram.asObservable();
  tvProgramBih$ = this.tvProgramBih.asObservable();

  constructor(private http: HttpClient) {}

  getTvProgram(queryDate: string = '') {
    return this.http
      .get<TvProgram>(`${environment.API_UNA}${environment.API_TV_PROGRAM}`)
      .subscribe({
        next: (res: TvProgram) => {
          this.tvProgram.next(res);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  getTvProgramBih(queryDate: string = '') {
    return this.http
      .get<TvProgram>(`${environment.API_TV_PROGRAM_BIH}`)
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
