import { Paginator } from './paginator.model';
import { TvShow } from './tv-show.model';
import { Personality } from './personality.model';
export interface PersonalityShow {
  success: boolean;
  data: {
    tv_personality: Personality;
    tv_shows: TvShow[];
  };
  paginator: Paginator;
}
