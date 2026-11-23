import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonalityShow } from '../interfaces/personality-show.model';
import { PersonalityListing } from './../interfaces/personality-listing.model';
import { PersonalitySingle } from './../interfaces/personality-single.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesService {
  /** Paginated list of personalities. Call in an injection context. */
  personalities(page: () => number) {
    return httpResource<PersonalityListing>(() => ({
      url: `${environment.API_UNA}${environment.API_PERSONALITIES}`,
      params: { per_page: 24, page: page() },
    }));
  }

  /** One personality. Call in an injection context. */
  personality(slug: () => string | undefined) {
    return httpResource<PersonalitySingle>(() => {
      const personality = slug();
      return personality
        ? `${environment.API_UNA}${environment.API_PERSNALITY}/${personality}`
        : undefined;
    });
  }

  /** Shows a personality appears in. Call in an injection context. */
  personalityShows(slug: () => string | undefined) {
    return httpResource<PersonalityShow>(() => {
      const personality = slug();
      return personality
        ? `${environment.API_UNA}${environment.API_PERSONALITY_SHOWS}/${personality}`
        : undefined;
    });
  }
}
