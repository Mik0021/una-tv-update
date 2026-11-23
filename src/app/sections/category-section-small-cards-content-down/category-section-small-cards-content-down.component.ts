import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Category } from 'src/app/interfaces/category.model';
import { Section } from 'src/app/interfaces/section.model';
import { initCardCarousel } from '../card-carousel';
import { TvShow } from './../../interfaces/tv-show.model';

@Component({
  selector: 'app-category-section-small-cards-content-down',
  templateUrl: './category-section-small-cards-content-down.component.html',
  styleUrls: ['./category-section-small-cards-content-down.component.scss'],
})
export class CategorySectionSmallCardsContentDownComponent implements OnInit, AfterViewInit {
  @Input() sectionData = {} as Section;
  articleList = [] as TvShow[];
  category = {} as Category;
  categorySlug: string = '';
  @ViewChild('carousel') carousel?: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.articleList = this.sectionData.tv_shows;
    this.category = this.sectionData.tv_category;
    this.generateCategorySlug();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.carousel) {
      initCardCarousel(this.carousel.nativeElement);
    }
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
