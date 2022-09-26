import { Article } from './../../interfaces/article.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-hero-card-large',
  templateUrl: './home-hero-card-large.component.html',
  styleUrls: ['./home-hero-card-large.component.scss'],
  host: {
    class: 'col-span-2 text-lg sm:text-3xl row-span-2',
  },
})
export class HomeHeroCardLargeComponent implements OnInit {
  @Input() articleData = {} as Article;
  hasImage: boolean = false;
  hasVideo: boolean = false;
  isTimeline: boolean = false;
  articleSlug: string = '';
  categorySlug: string = '';
  srcSet: string = '';
  constructor() {}

  ngOnInit(): void {
    this.createArticleSlug();
    this.createCategorySlug();
    this.createSrcSet();
    // this.hasImage = this.articleData.hasImages;
    // this.hasVideo = this.articleData.hasVideo;
    // this.isTimeline = this.articleData.isTimeline;
  }

  createSrcSet() {
    if (
      this.articleData.images[0].thumbnails[345] &&
      this.articleData.images[0].thumbnails[710]
    ) {
      this.srcSet = `${this.articleData.images[0].thumbnails[345]} 175w, ${this.articleData.images[0].thumbnails[710]}`;
    }
  }

  createArticleSlug() {
    if (this.articleData) {
      if (this.articleData.category.parent_category) {
        this.articleSlug = `/${this.articleData.category.parent_category.slug}/${this.articleData.category.slug}/${this.articleData.slug}`;
      } else {
        this.articleSlug = `/${this.articleData.category.slug}/${this.articleData.slug}`;
      }
    }
  }

  createCategorySlug() {
    if (this.articleData) {
      if (this.articleData.category.parent_category) {
        this.categorySlug = `/${this.articleData.category.parent_category.slug}/${this.articleData.category.slug}`;
      } else {
        this.categorySlug = `/${this.articleData.category.slug}`;
      }
    }
  }
}
