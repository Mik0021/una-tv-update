import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CategorysService } from '../services/categorys.service';

/**
 * `:category/:x` is either a subcategory listing or a post. Ask the API whether
 * `x` is a subcategory; if not (or the call fails) fall through to the post route.
 */
export const subcategoryGuard: CanMatchFn = (_route, segments) =>
  inject(CategorysService)
    .getCategoryTest(segments[1]?.path ?? null)
    .pipe(
      map((isSubcategory) => !!isSubcategory),
      catchError(() => of(false)),
    );
