import { Tags } from 'src/app/interfaces/tags.model';
import { Paginator } from './paginator.model';
import { TvShow } from './tv-show.model';

export interface Tag {
  sucess: boolean;
  data: {
    tv_tag: Tags;
    tv_shows: TvShow[];
  };
  paginator: Paginator;
}
