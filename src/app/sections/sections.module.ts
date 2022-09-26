import { RouterModule } from '@angular/router';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySectionAllContentDownComponent } from './category-section-all-content-down/category-section-all-content-down.component';
import { CategorySectionContentRightComponent } from './category-section-content-right/category-section-content-right.component';
import { CategorySectionDoubleLargeContentDownComponent } from './category-section-double-large-content-down/category-section-double-large-content-down.component';
import { CategorySectionSmallCardsContentDownComponent } from './category-section-small-cards-content-down/category-section-small-cards-content-down.component';
import { HomeHeroSectionFullComponent } from './home-hero-section-full/home-hero-section-full.component';
import { HomeHeroSectionComponent } from './home-hero-section/home-hero-section.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    HomeHeroSectionComponent,
    CategorySectionAllContentDownComponent,
    CategorySectionContentRightComponent,
    CategorySectionDoubleLargeContentDownComponent,
    CategorySectionSmallCardsContentDownComponent,
    HomeHeroSectionFullComponent,
  ],
  imports: [CommonModule, ComponentsModule, RouterModule, SwiperModule],
  exports: [
    HomeHeroSectionComponent,
    CategorySectionAllContentDownComponent,
    CategorySectionContentRightComponent,
    CategorySectionDoubleLargeContentDownComponent,
    CategorySectionSmallCardsContentDownComponent,
    HomeHeroSectionFullComponent,
    CommonModule,
  ],
})
export class SectionsModule {}
