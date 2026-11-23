import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryList } from './../interfaces/category-list.model';
import { ParentCategory } from './../interfaces/parent-category.model';

const PER_PAGE = 24;

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  private http = inject(HttpClient);

  /** Shows of `category/subcategory`. Call in an injection context. */
  category(
    category: () => string | undefined,
    subcategory: () => string | undefined,
    page: () => number,
  ) {
    return httpResource<CategoryList>(() => {
      const parent = category();
      const child = subcategory();
      return parent && child
        ? {
            url: `${environment.API_UNA}${environment.API_CATEGORY}/${parent}/${child}`,
            params: { per_page: PER_PAGE, page: page() },
          }
        : undefined;
    });
  }

  /** A top-level category and its shows. Call in an injection context. */
  parentCategory(slug: () => string | undefined, page: () => number) {
    return httpResource<ParentCategory>(() => {
      const category = slug();
      return category
        ? {
            url: `${environment.API_UNA}${environment.API_PARENT_CATEGORY}/${category}`,
            params: { per_page: PER_PAGE, page: page() },
          }
        : undefined;
    });
  }

  /** Whether `slug` is a subcategory (used by subcategoryGuard). */
  getCategoryTest(subcategory: string | null) {
    return this.http.get<boolean>(
      `${environment.API_UNA}${environment.API_TV_IS_SUBCATEGORY}/${subcategory}`,
    );
  }
}
