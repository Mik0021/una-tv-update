import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.model';

@Component({
  selector: 'app-home-hero-card-small',
  templateUrl: './home-hero-card-small.component.html',
  styleUrls: ['./home-hero-card-small.component.scss'],
  host: {
    class: 'text-base relative',
  },
})
export class HomeHeroCardSmallComponent implements OnInit {
  @Input() articleData = {} as Article;
  hasImage: boolean = false;
  hasVideo: boolean = false;
  isTimeline: boolean = false;
  articleSlug: string = '';
  categorySlug: string = '';
  constructor() {}

  ngOnInit(): void {
    this.createArticleSlug();
    this.createCategorySlug();
    // this.hasImage = this.articleData.hasImages;
    // this.hasVideo = this.articleData.hasVideo;
    // this.isTimeline = this.articleData.isTimeline;
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
