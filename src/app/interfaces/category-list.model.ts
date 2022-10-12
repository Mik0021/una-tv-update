import { Category } from 'src/app/interfaces/category.model';
import { Paginator } from './paginator.model';
import { TvShow } from './tv-show.model';

export interface CategoryList {
  success: boolean;
  data: {
    category: Category;
    articles: TvShow[];
  };
  paginator: Paginator;
}
