import { Personality } from './personality.model';
import { Paginator } from './paginator.model';

export interface PersonalityListing {
  success: boolean;
  data: {
    tv_personalities: Personality[];
  };
  paginator: Paginator;
}
