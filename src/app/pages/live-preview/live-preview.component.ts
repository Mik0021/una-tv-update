import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from 'src/app/interfaces/article.model';
import { Image } from 'src/app/interfaces/image.model';
import { Post } from 'src/app/interfaces/post.model';
import { Source } from 'src/app/interfaces/source.model';
import { Tags } from 'src/app/interfaces/tags.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrls: ['./live-preview.component.scss'],
})
export class LivePreviewComponent implements OnInit {
  single_post = {} as Post;
  tags_list: Tags[] = [];
  conected_articles: Article[] = [];
  tokenID: string | null = '';
  articleSource = {} as Source;
  content: any;
  images: Image[] = [];
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        return;
      }
      this.tokenID = paramMap.get('id');

      this.postService.getLivePreview(this.tokenID).subscribe(
        (post: Post) => {
          this.single_post = post;
          this.tags_list = post.data.tags;
          this.conected_articles = post.data.related_articles;
          this.articleSource = post.data.source;
          this.images = post.data.images;
          this.content = this.single_post.data.description;
        },
        (error: any) => {
          this.router.navigate(['404']);
        }
      );
    });
  }

  ngOnInit(): void {}
}
