import { Category } from './category.model';
import { Paginator } from './paginator.model';
import { TvShow } from './tv-show.model';

export interface ParentCategory {
  success: boolean;
  data: {
    tv_category: Category;
    tv_shows: TvShow[];
    promo_articles: TvShow[];
  };
  paginator: Paginator;
}
