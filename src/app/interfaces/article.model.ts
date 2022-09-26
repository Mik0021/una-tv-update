import { Image } from './image.model';
import { Category } from 'src/app/interfaces/category.model';

export interface Article {
  resource_type: string;
  id: number;
  title: string;
  slug: string;
  short_description: string;
  seo_description: string;
  is_promo: boolean;
  category: Category;
  hasImages: boolean;
  hasVideo: boolean;
  isTimeline: boolean;
  imgUrl: string;
  images: Image[];
}
