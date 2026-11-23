import { NgStyle } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Section } from 'src/app/interfaces/section.model';
import { PersonalityHomeCardComponent } from '../../components/personality-home-card/personality-home-card.component';
import { categoryPath } from '../../utils/paths';
import { initCardCarousel } from '../card-carousel';

@Component({
  selector: 'app-category-section-personalities',
  templateUrl: './category-section-personalities.component.html',
  styleUrls: ['./category-section-personalities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, RouterLink, PersonalityHomeCardComponent],
  // <swiper-container>/<swiper-slide> are Swiper Element web components
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategorySectionPersonalitiesComponent {
  readonly sectionData = input.required<Section>();

  protected readonly articleList = computed(
    () => this.sectionData().tv_personalities,
  );
  protected readonly category = computed(() => this.sectionData().tv_category);
  protected readonly categorySlug = computed(() =>
    categoryPath(this.category()),
  );

  private readonly carousel =
    viewChild.required<ElementRef<HTMLElement>>('carousel');

  constructor() {
    // Browser only; runs once the (hydrated) slides are in the DOM.
    afterNextRender(() =>
      initCardCarousel(this.carousel().nativeElement).catch((error) =>
        console.error('Carousel initialization failed', error),
      ),
    );
  }
}
