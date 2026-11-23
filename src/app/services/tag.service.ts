import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tag } from './../interfaces/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  /** Shows with a tag. Call in an injection context. */
  tag(slug: () => string | undefined, page: () => number) {
    return httpResource<Tag>(() => {
      const tag = slug();
      return tag
        ? {
            url: `${environment.API_UNA}${environment.API_TAG}/${tag}`,
            params: { per_page: 24, page: page() },
          }
        : undefined;
    });
  }
}
