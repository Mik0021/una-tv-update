import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.model';
import { Category } from 'src/app/interfaces/category.model';
import { Section } from 'src/app/interfaces/section.model';

@Component({
  selector: 'app-category-section-double-large-content-down',
  templateUrl: './category-section-double-large-content-down.component.html',
  styleUrls: ['./category-section-double-large-content-down.component.scss'],
})
export class CategorySectionDoubleLargeContentDownComponent implements OnInit {
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
