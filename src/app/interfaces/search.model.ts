import { Paginator } from 'src/app/interfaces/paginator.model';
import { Article } from './article.model';

export interface Search {
  success: boolean;
  data: Article[];
  paginator: Paginator;
}
