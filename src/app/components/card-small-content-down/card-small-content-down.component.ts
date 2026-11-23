import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { TvShow } from './../../interfaces/tv-show.model';

@Component({
    selector: 'app-card-small-content-down',
    templateUrl: './card-small-content-down.component.html',
    styleUrls: ['./card-small-content-down.component.scss'],
    host: {
        class: 'text-base',
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CardSmallContentDownComponent implements OnInit, OnChanges {
  @Input() articleData = {} as TvShow;
  hasImage: boolean = false;
  hasVideo: boolean = false;
  isTimeline: boolean = false;
  articleSlug: string = '';
  categorySlug: string = '';
  srcSet: string = '';
  constructor() {}

  ngOnInit(): void {
    this.createArticleSlug();
    // this.createCategorySlug();
    this.createSrcSet();
    // this.hasImage = this.articleData.hasImages;
    // this.hasVideo = this.articleData.hasVideo;
    // this.isTimeline = this.articleData.isTimeline;
  }
  ngOnChanges(changes: SimpleChanges) {
    // if (changes['articleData']) {
    //   let variableChange = changes['articleData'];
    //   console.log(variableChange);
    //   if (variableChange.currentValue && variableChange) {
    //     this.createSrcSet();
    //     this.createArticleSlug();
    //   }
    // }
  }

  createSrcSet() {
    if (this.articleData) {
      if (
        this.articleData.image &&
        this.articleData.image.thumbnails &&
        this.articleData.image.thumbnails[144] &&
        this.articleData.image.thumbnails[345]
      ) {
        this.srcSet = `${this.articleData.image.thumbnails[144]} 175w, ${this.articleData.image.thumbnails[345]}`;
      }
    }
  }

  createArticleSlug() {
    if (this.articleData) {
      if (this.articleData.tv_category.parent_category) {
        this.articleSlug = `/${this.articleData.tv_category.parent_category.slug}/${this.articleData.tv_category.slug}/${this.articleData.slug}`;
      } else {
        this.articleSlug = `/${this.articleData.tv_category.slug}/${this.articleData.slug}`;
      }
    }
  }

  // createCategorySlug() {
  //   if (this.articleData) {
  //     if (this.articleData.category.parent_category) {
  //       this.categorySlug = `/${this.articleData.category.parent_category.slug}/${this.articleData.category.slug}`;
  //     } else {
  //       this.categorySlug = `/${this.articleData.category.slug}`;
  //     }
  //   }
  // }
}
