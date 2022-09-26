import { Section } from 'src/app/interfaces/section.model';
import { Article } from 'src/app/interfaces/article.model';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.model';

@Component({
  selector: 'app-category-section-all-content-down',
  templateUrl: './category-section-all-content-down.component.html',
  styleUrls: ['./category-section-all-content-down.component.scss'],
})
export class CategorySectionAllContentDownComponent implements OnInit {
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
