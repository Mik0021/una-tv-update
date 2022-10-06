import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.model';

@Component({
  selector: 'app-home-hero-section-full',
  templateUrl: './home-hero-section-full.component.html',
  styleUrls: ['./home-hero-section-full.component.scss'],
  host: {
    class: 'lg:pb-64',
  },
})
export class HomeHeroSectionFullComponent implements OnInit {
  @Input() articles = [] as Article[];
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
    if (this.articles[0]) {
      if (
        this.articles[0].images.length > 0 &&
        this.articles[0].images[0].thumbnails &&
        this.articles[0].images[0].thumbnails[345] &&
        this.articles[0].images[0].thumbnails[710]
      ) {
        this.srcSet = `${this.articles[0].images[0].thumbnails[345]} 345w, ${this.articles[0].images[0].thumbnails[710]} 710w, ${this.articles[0].images[0].thumbnails[944]} 944w, ${this.articles[0].images[0].url}  `;
      }
    }
  }

  createArticleSlug() {
    if (this.articles[0]) {
      if (this.articles[0].category.parent_category) {
        this.articleSlug = `/${this.articles[0].category.parent_category.slug}/${this.articles[0].category.slug}/${this.articles[0].slug}`;
      } else {
        this.articleSlug = `/${this.articles[0].category.slug}/${this.articles[0].slug}`;
      }
    }
  }

  createCategorySlug() {
    if (this.articles[0]) {
      if (this.articles[0].category.parent_category) {
        this.categorySlug = `/${this.articles[0].category.parent_category.slug}/${this.articles[0].category.slug}`;
      } else {
        this.categorySlug = `/${this.articles[0].category.slug}`;
      }
    }
  }
}
