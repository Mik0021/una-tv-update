import { SubmenuItem } from './submenu-item.model';
export interface Nav {
  data: {
    resource_type: string;
    type: string;
    id: number;
    title: string;
    slug: string;
    sort_number: number;
    color: string;
    children: SubmenuItem[];
  }[];
}
