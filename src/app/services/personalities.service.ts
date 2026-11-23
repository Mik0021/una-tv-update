import { PersonalitySingle } from './../interfaces/personality-single.model';
import { PersonalityListing } from './../interfaces/personality-listing.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { PersonalityShow } from '../interfaces/personality-show.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesService {
  private http = inject(HttpClient);

  private personalitiesList = new Subject<PersonalityListing>();
  private personalitySingle = new Subject<PersonalitySingle>();
  private personalityShows = new Subject<PersonalityShow>();

  personalitiesList$ = this.personalitiesList.asObservable();
  personalitySingle$ = this.personalitySingle.asObservable();
  personalityShows$ = this.personalityShows.asObservable();

  getPersonalities(currPage: number) {
    let params = new HttpParams().set('per_page', 24).set('page', currPage);
    return this.http
      .get<PersonalityListing>(
        `${environment.API_UNA}${environment.API_PERSONALITIES}`,
        { params },
      )
      .subscribe({
        next: (personalityList: PersonalityListing) => {
          this.personalitiesList.next(personalityList);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  getPersonality(personalitySlug: string | null) {
    return this.http
      .get<PersonalitySingle>(
        `${environment.API_UNA}${environment.API_PERSNALITY}/${personalitySlug}`,
      )
      .subscribe({
        next: (personalitySingle: PersonalitySingle) => {
          this.personalitySingle.next(personalitySingle);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  getPersonalityShows(personalitySlug: string | null) {
    return this.http
      .get<PersonalityShow>(
        `${environment.API_UNA}${environment.API_PERSONALITY_SHOWS}/${personalitySlug}`,
      )
      .subscribe({
        next: (personalityShows: PersonalityShow) => {
          this.personalityShows.next(personalityShows);
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
