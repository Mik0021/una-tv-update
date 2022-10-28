import { Category } from 'src/app/interfaces/category.model';
import { Personality } from './personality.model';
import { TvShow } from './tv-show.model';

export interface Section {
  resource_type: string;
  id: number;
  sort_number: number;
  tv_category: Category;
  tv_personalities: Personality[];
  tv_show_template: {
    resource_type: string;
    id: number;
    type_id: number;
    type: string;
    tv_show_count: number;
  };
  tv_shows: TvShow[];
}
