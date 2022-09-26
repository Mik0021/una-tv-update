import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.model';
import { Category } from 'src/app/interfaces/category.model';
import { Section } from 'src/app/interfaces/section.model';
import SwiperCore from 'swiper';

@Component({
  selector: 'app-category-section-small-cards-content-down',
  templateUrl: './category-section-small-cards-content-down.component.html',
  styleUrls: ['./category-section-small-cards-content-down.component.scss'],
})
export class CategorySectionSmallCardsContentDownComponent implements OnInit {
  @Input() sectionData = {} as Section;
  articleList = [] as Article[];
  category = {} as Category;
  categorySlug: string = '';
  constructor() {}

  ngOnInit(): void {
    this.articleList = this.sectionData.articles;
    this.category = this.sectionData.category;
    this.generateCategorySlug();
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
