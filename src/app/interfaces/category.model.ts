export interface Category {
  resource_type: string;
  id: number;
  name: string;
  slug: string;
  color: string;
  seo_description: string;
  seo_title: string;
  parent_category: {
    resource_type: string;
    id: number;
    name: string;
    slug: string;
    color: string;
    seo_description: string;
    seo_title: string;
  };
}
