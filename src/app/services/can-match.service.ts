import { Category } from 'src/app/interfaces/category.model';
import { CategorysService } from './categorys.service';
import { Injectable } from '@angular/core';
import { Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CategoryList } from '../interfaces/category-list.model';

@Injectable({
  providedIn: 'root',
})
export class CanMatchService  {
  private isCategoryPath = new Subject<boolean>();

  isCategoryPath$ = this.isCategoryPath.asObservable();

  constructor(private categoryService: CategorysService) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.categoryService.getCategoryTest(segments[1].path).subscribe({
      next: (sucess: boolean) => {
        if (sucess) {
          this.isCategoryPath.next(true);
        } else {
          this.isCategoryPath.next(false);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    return this.isCategoryPath$;
  }
}
