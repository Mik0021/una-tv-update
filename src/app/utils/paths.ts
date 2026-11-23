import { Category } from '../interfaces/category.model';
import { TvShow } from '../interfaces/tv-show.model';

/** `/parent/category` or `/category`, matching the `:category[/:subcategory]` routes. */
export function categoryPath(category: Category | null | undefined): string {
  if (!category) {
    return '';
  }
  return category.parent_category
    ? `/${category.parent_category.slug}/${category.slug}`
    : `/${category.slug}`;
}

/** Link to a show/post: its category path followed by the show slug. */
export function tvShowPath(show: TvShow | null | undefined): string {
  if (!show) {
    return '';
  }
  return `${categoryPath(show.tv_category)}/${show.slug}`;
}
