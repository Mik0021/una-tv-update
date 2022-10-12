import { Image } from './image.model';

export interface PersonalitySingle {
  data: {
    resource_type: string;
    id: number;
    name: string;
    sub_title: string;
    slug: string;
    description: string;
    image: Image;
  };
  success: boolean;
}
