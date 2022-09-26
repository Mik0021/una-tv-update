import { Article } from './article.model';
import { Category } from './category.model';
import { Paginator } from './paginator.model';

export interface ParentCategory {
  success: boolean;
  data: {
    category: Category;
    articles: Article[];
    promo_articles: Article[];
  };
  paginator: Paginator;
}
