import { Tags } from 'src/app/interfaces/tags.model';
import { Paginator } from './paginator.model';
import { TvShow } from './tv-show.model';

export interface Tag {
  sucess: boolean;
  data: {
    tag: Tags;
    articles: TvShow[];
  };
  paginator: Paginator;
}
