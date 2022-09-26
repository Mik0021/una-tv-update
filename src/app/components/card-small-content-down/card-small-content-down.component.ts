import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.model';

@Component({
  selector: 'app-card-small-content-down',
  templateUrl: './card-small-content-down.component.html',
  styleUrls: ['./card-small-content-down.component.scss'],
  host: {
    class: 'text-base',
  },
})
export class CardSmallContentDownComponent implements OnInit {
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
