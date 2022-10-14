import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.model';
import { Section } from 'src/app/interfaces/section.model';
import SwiperCore, { Navigation } from 'swiper';
import { TvShow } from './../../interfaces/tv-show.model';

@Component({
  selector: 'app-category-section-small-cards-content-down',
  templateUrl: './category-section-small-cards-content-down.component.html',
  styleUrls: ['./category-section-small-cards-content-down.component.scss'],
})
export class CategorySectionSmallCardsContentDownComponent implements OnInit {
  @Input() sectionData = {} as Section;
  articleList = [] as TvShow[];
  category = {} as Category;
  categorySlug: string = '';
  swiperConfig: any = {
    slidesPerView: 4.5,
    navigation: true,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },

      768: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },

      1024: {
        slidesPerView: 3.5,
        spaceBetween: 50,
        watchSlidesProgress: true,
      },
      1280: {
        slidesPerView: 4.5,
        spaceBetween: 50,
        watchSlidesProgress: true,
      },
    },
  };
  constructor() {}

  ngOnInit(): void {
    this.articleList = this.sectionData.tv_shows;
    this.category = this.sectionData.tv_category;
    this.generateCategorySlug();
    SwiperCore.use([Navigation]);
  }
  generateCategorySlug() {
    if (this.category) {
      if (this.category.parent_category) {
        this.categorySlug = `/${this.category.parent_category.slug}/${this.category.slug}`;
      } else {
        this.categorySlug = `/${this.category.slug}`;
      }
    }
  }
}
