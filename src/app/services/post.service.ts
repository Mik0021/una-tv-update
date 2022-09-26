import { Post } from './../interfaces/post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPost(
    parentCategory: string | null,
    category: string | null,
    post: string | null
  ) {
    return this.http.get<Post>(
      `${environment.API_UNA}${environment.API_POST}/${parentCategory}/${category}/${post}`
    );
  }

  getParentCategoryPost(parentCategory: string | null, post: string | null) {
    return this.http.get<Post>(
      `${environment.API_UNA}${environment.API_POST}/${parentCategory}/${post}`
    );
  }

  getLivePreview(postID: string | null) {
    // let params = new HttpParams().set('token', postID);
    return this.http.post<Post>(
      `${environment.API_UNA}${environment.API_LIVE_PREVIEW}?token=${postID}`,
      null
    );
  }
}
