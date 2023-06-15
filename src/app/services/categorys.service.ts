import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryList } from './../interfaces/category-list.model';
import { ParentCategory } from './../interfaces/parent-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  private category = new Subject<CategoryList>();
  private parentCategory = new Subject<ParentCategory>();

  category$ = this.category.asObservable();
  parentCategory$ = this.parentCategory.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getCategory(
    category: string | null,
    subcategory: string | null,
    currPage: number
  ) {
    let params = new HttpParams().set('per_page', 24).set('page', currPage);
    return this.http
      .get<CategoryList>(
        `${environment.API_UNA}${environment.API_CATEGORY}/${category}/${subcategory}`,
        { params }
      )
      .subscribe((category: CategoryList) => {
        this.category.next(category);
      });
  }

  getCategoryTest(subcategory: string | null) {
    return this.http.get<boolean>(
      `${environment.API_UNA}${environment.API_TV_IS_SUBCATEGORY}/${subcategory}`
    );
  }

  getParentCategory(query: string | null, currPage: number) {
    let params = new HttpParams().set('per_page', 24).set('page', currPage);
    return this.http
      .get<ParentCategory>(
        `${environment.API_UNA}${environment.API_PARENT_CATEGORY}/${query}`,
        { params }
      )
      .subscribe(
        (parentCat: ParentCategory) => {
          this.parentCategory.next(parentCat);
        },
        (error: any) => {
          this.router.navigate(['404']);
        }
      );
  }
}
