import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from './../interfaces/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  /**
   * A show/post, at `category/post` or `category/subcategory/post`.
   * Call in an injection context.
   */
  post(
    category: () => string | undefined,
    subcategory: () => string | undefined,
    post: () => string | undefined,
  ) {
    return httpResource<Post>(() => {
      const parent = category();
      const slug = post();
      if (!parent || !slug) {
        return undefined;
      }
      const child = subcategory();
      return child
        ? `${environment.API_UNA}${environment.API_POST}/${parent}/${child}/${slug}`
        : `${environment.API_UNA}${environment.API_POST}/${parent}/${slug}`;
    });
  }
}
