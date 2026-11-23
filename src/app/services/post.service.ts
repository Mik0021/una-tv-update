import { Post } from './../interfaces/post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  getPost(
    parentCategory: string | null,
    category: string | null,
    post: string | null,
  ) {
    return this.http.get<Post>(
      `${environment.API_UNA}${environment.API_POST}/${parentCategory}/${category}/${post}`,
    );
  }

  getParentCategoryPost(parentCategory: string | null, post: string | null) {
    return this.http.get<Post>(
      `${environment.API_UNA}${environment.API_POST}/${parentCategory}/${post}`,
    );
  }
}
