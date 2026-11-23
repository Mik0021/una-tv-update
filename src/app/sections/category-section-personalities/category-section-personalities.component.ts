import { isPlatformBrowser, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Category } from 'src/app/interfaces/category.model';
import { Personality } from 'src/app/interfaces/personality.model';
import { Section } from 'src/app/interfaces/section.model';
import { initCardCarousel } from '../card-carousel';
import { RouterLink } from '@angular/router';
import { PersonalityHomeCardComponent } from '../../components/personality-home-card/personality-home-card.component';

@Component({
  selector: 'app-category-section-personalities',
  templateUrl: './category-section-personalities.component.html',
  styleUrls: ['./category-section-personalities.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgStyle, RouterLink, PersonalityHomeCardComponent],
  // <swiper-container>/<swiper-slide> are Swiper Element web components
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategorySectionPersonalitiesComponent
  implements OnInit, AfterViewInit
{
  private platformId = inject(PLATFORM_ID);

  @Input() sectionData = {} as Section;
  articleList = [] as Personality[];
  category = {} as Category;
  categorySlug: string = '';
  @ViewChild('carousel') carousel?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.articleList = this.sectionData.tv_personalities;
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
