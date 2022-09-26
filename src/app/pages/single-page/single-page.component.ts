import { environment } from 'src/environments/environment';
import { DOCUMENT, Location, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article.model';
import { Image } from 'src/app/interfaces/image.model';
import { Source } from 'src/app/interfaces/source.model';
import { Tags } from 'src/app/interfaces/tags.model';
import { Post } from './../../interfaces/post.model';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss'],
})
export class SinglePageComponent implements OnInit {
  single_post = {} as Post;
  tags_list: Tags[] = [];
  conected_articles: Article[] = [];
  postRoute: string | null = '';
  category: string | null = '';
  subCategory: string | null = '';
  articleSource = {} as Source;
  content: any;
  images: Image[] = [];
  appShare: string = '';
  srcSet: string = '';
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (
        !paramMap.has('post') &&
        !paramMap.has('category') &&
        !paramMap.has('subcategory')
      ) {
        return;
      } else {
        this.postRoute = paramMap.get('post');
        this.category = paramMap.get('category');
        this.subCategory = paramMap.get('subcategory');
        if (!this.subCategory) {
          this.postService
            .getParentCategoryPost(this.category, this.postRoute)
            .subscribe(
              (post: Post) => {
                this.single_post = post;
                this.tags_list = post.data.tags;
                this.conected_articles = post.data.related_articles;
                this.articleSource = post.data.source;
                this.content = this.single_post.data.description;
                this.images = post.data.images;
                this.addTags();
              },
              (error: any) => {
                this.router.navigate(['404']);
              }
            );
        } else {
          this.postService
            .getPost(this.category, this.subCategory, this.postRoute)
            .subscribe(
              (post: Post) => {
                this.single_post = post;
                this.tags_list = post.data.tags;
                this.conected_articles = post.data.related_articles;
                this.articleSource = post.data.source;
                this.content = this.single_post.data.description;
                this.images = post.data.images;
                this.addTags();
                this.createSrcSet();
              },
              (error: any) => {
                this.router.navigate(['404']);
              }
            );
        }
      }
    });
  }

  ngOnInit(): void {}

  createSrcSet() {
    if (
      this.images.length > 0 &&
      this.images[0].thumbnails &&
      this.images[0].thumbnails[345] &&
      this.images[0].thumbnails[710] &&
      this.images[0].thumbnails[944]
    ) {
      this.srcSet = `${this.images[0].thumbnails[345]} 245w, ${this.images[0].thumbnails[710]} 490w, ${this.images[0].thumbnails[944]}`;
    }
  }

  addTags() {
    this.titleService.setTitle(this.single_post.data.title);
    this.metaService.updateTag({
      name: 'og:title',
      content: this.single_post.data.title,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: this.single_post.data.short_description,
    });
    this.metaService.updateTag({
      name: 'og:url',
      content: `${this._document.location.href}`,
    });
    this.metaService.updateTag({
      name: 'og:type',
      content: 'article',
    });
    this.metaService.updateTag({
      name: 'og:image',
      content: this.single_post.data.images[0].url,
    });

    this.metaService.updateTag({
      name: 'description',
      content: this.single_post.data.short_description,
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: this.single_post.data.category.name,
    });
  }
}
