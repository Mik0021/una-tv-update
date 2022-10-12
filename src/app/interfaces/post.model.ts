import { Image } from './image.model';
import { Personality } from './personality.model';
import { Tags } from './tags.model';

export interface Post {
  data: {
    resource_type: string;
    id: number;
    title: string;
    sub_title: string;
    seo_description: string;
    seo_title: string;
    slug: string;
    description: string;
    brid_video_id: string | null;
    brid_default_player_id: string;
    tv_personalities: Personality[];
    tv_tags: Tags[];
    image: Image;
    settings: {
      duration: number;
    };
  };
  success: boolean;
}
