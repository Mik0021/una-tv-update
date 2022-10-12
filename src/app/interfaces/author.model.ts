import { TvShow } from './tv-show.model';
import { Article } from './article.model';
import { Authors } from './authors.model';
import { Paginator } from './paginator.model';
export interface Author {
  sucess: boolean;
  data: {
    author: Authors;
    articles: TvShow[];
  };
  paginator: Paginator;
}
