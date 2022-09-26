import { Category } from 'src/app/interfaces/category.model';
import { Article } from './article.model';
import { Paginator } from './paginator.model';

export interface CategoryList {
  success: boolean;
  data: {
    category: Category;
    articles: Article[];
  };
  paginator: Paginator;
}
