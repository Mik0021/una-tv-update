import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TvProgram } from './../interfaces/tv-program.model';

const MAX_TV_DAYS = 7;

@Injectable({
  providedIn: 'root',
})
export class TvProgramService {
  /** The TV schedule, at most MAX_TV_DAYS days. Call in an injection context. */
  tvProgram() {
    return httpResource<TvProgram>(
      () => `${environment.API_UNA}${environment.API_TV_PROGRAM}`,
      {
        parse: (raw) => {
          const program = raw as TvProgram;
          return { ...program, data: program.data.slice(0, MAX_TV_DAYS) };
        },
      },
    );
  }
}
