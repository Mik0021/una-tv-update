import { PersonalitySingle } from './../interfaces/personality-single.model';
import { PersonalityListing } from './../interfaces/personality-listing.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesService {
  private personalitiesList = new Subject<PersonalityListing>();
  private personalitySingle = new Subject<PersonalitySingle>();

  personalitiesList$ = this.personalitiesList.asObservable();
  personalitySingle$ = this.personalitySingle.asObservable();
  constructor(private http: HttpClient) {}

  getPersonalities() {
    return this.http
      .get<PersonalityListing>(
        `${environment.API_UNA}${environment.API_PERSONALITIES}`
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
        `${environment.API_UNA}${environment.API_PERSNALITY}/${personalitySlug}`
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
}
