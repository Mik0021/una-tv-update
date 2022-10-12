import { Category } from 'src/app/interfaces/category.model';
import { TvShow } from './tv-show.model';

export interface Section {
  resource_type: string;
  id: number;
  sort_number: number;
  category: Category;
  tv_show_template: {
    resource_type: string;
    id: number;
    type_id: number;
    type: string;
    article_count: number;
  };
  tv_shows: TvShow[];
}
