import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.model';

@Component({
  selector: 'app-card-small-content-right',
  templateUrl: './card-small-content-right.component.html',
  styleUrls: ['./card-small-content-right.component.scss'],
  host: {
    class: 'col-span-2 row-span-1  text-base ',
  },
})
export class CardSmallContentRightComponent implements OnInit {
  @Input() articleData = {} as Article;
  hasImage: boolean = false;
  hasVideo: boolean = false;
  isTimeline: boolean = false;
  articleSlug: string = '';
  constructor() {}

  ngOnInit(): void {
    this.createArticleSlug();
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
}
