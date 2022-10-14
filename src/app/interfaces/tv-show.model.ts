import { Category } from 'src/app/interfaces/category.model';
import { Image } from './image.model';

export interface TvShow {
  resource_type: string;
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  image: Image;
  settings: {};
  tv_category: Category;
}
