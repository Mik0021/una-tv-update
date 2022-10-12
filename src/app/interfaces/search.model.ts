import { Paginator } from 'src/app/interfaces/paginator.model';
import { TvShow } from './tv-show.model';

export interface Search {
  success: boolean;
  data: TvShow[];
  paginator: Paginator;
}
