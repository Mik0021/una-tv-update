import { Image } from './image.model';
import { Source } from './source.model';
import { Article } from 'src/app/interfaces/article.model';
import { Tags } from './tags.model';
import { Category } from './category.model';
import { Authors } from './authors.model';

export interface Post {
  data: {
    resource_type: string;
    id: number;
    title: string;
    slug: string;
    short_description: string;
    is_promo: boolean;
    description: string;
    category: Category;
    authors: Authors[];
    tags: Tags[];
    source: Source;
    related_articles: Article[];
    images: Image[];
    published_at: string;
    seo_description: string;
    seo_title: string;
    brid_video_id: string | null;
    brid_default_player_id: string;
  };
  success: boolean;
}
