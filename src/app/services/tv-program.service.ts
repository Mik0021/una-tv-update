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

  tvProgram$ = this.tvProgram.asObservable();

  constructor(private http: HttpClient) {}

  getTvProgram(queryDate: string = '') {
    let params = new HttpParams().set('program_date', queryDate);
    return this.http
      .get<TvProgram>(`${environment.API_UNA}${environment.API_TV_PROGRAM}`, {
        params: params,
      })
      .subscribe({
        next: (res: TvProgram) => {
          this.tvProgram.next(res);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
