import { Image } from './image.model';

export interface Personality {
  resource_type: string;
  id: number;
  name: string;
  sub_title: string;
  slug: string;
  image: Image;
}
