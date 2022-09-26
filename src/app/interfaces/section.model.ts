import { Category } from 'src/app/interfaces/category.model';
import { Article } from './article.model';

export interface Section {
  resource_type: string;
  id: number;
  sort_number: number;
  category: Category;
  article_template: {
    resource_type: string;
    id: number;
    type_id: number;
    type: string;
    article_count: number;
  };
  articles: Article[];
}
