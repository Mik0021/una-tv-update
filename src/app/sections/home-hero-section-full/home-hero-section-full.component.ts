import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { TvShow } from './../../interfaces/tv-show.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-hero-section-full',
    templateUrl: './home-hero-section-full.component.html',
    styleUrls: ['./home-hero-section-full.component.scss'],
    host: {
        class: 'lg:pb-64',
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class HomeHeroSectionFullComponent implements OnInit, OnChanges {
  @Input() articles = [] as TvShow[];
  articleSlug: string = '';
  categorySlug: string = '';
  srcSet: string = '';

  constructor() {}

  ngOnInit(): void {
    // this.createCategorySlug();
    // this.hasImage = this.articleData.hasImages;
    // this.hasVideo = this.articleData.hasVideo;
    // this.isTimeline = this.articleData.isTimeline;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['articles']) {
      let variableChange = changes['articles'];

      if (variableChange.currentValue.length > 0) {
        this.createSrcSet();
        this.createArticleSlug();
      }
    }
  }

  createSrcSet() {
    if (this.articles[0]) {
      if (
        this.articles[0].image &&
        this.articles[0].image.thumbnails &&
        this.articles[0].image.thumbnails[345] &&
        this.articles[0].image.thumbnails[710]
      ) {
        this.srcSet = `${this.articles[0].image.thumbnails[345]} 345w, ${this.articles[0].image.thumbnails[710]} 710w, ${this.articles[0].image.thumbnails[944]} 944w, ${this.articles[0].image.url}  `;
      }
    }
  }

  createArticleSlug() {
    if (this.articles[0]) {
      if (this.articles[0].tv_category.parent_category) {
        this.articleSlug = `/${this.articles[0].tv_category.parent_category.slug}/${this.articles[0].tv_category.slug}/${this.articles[0].slug}`;
      } else {
        this.articleSlug = `/${this.articles[0].tv_category.slug}/${this.articles[0].slug}`;
      }
    }
  }

  // createCategorySlug() {
  //   if (this.articles[0]) {
  //     if (this.articles[0].category.parent_category) {
  //       this.categorySlug = `/${this.articles[0].category.parent_category.slug}/${this.articles[0].category.slug}`;
  //     } else {
  //       this.categorySlug = `/${this.articles[0].category.slug}`;
  //     }
  //   }
  // }
}
