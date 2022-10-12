import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from './../components/components.module';
import { CategorySectionSmallCardsContentDownComponent } from './category-section-small-cards-content-down/category-section-small-cards-content-down.component';
import { HomeHeroSectionFullComponent } from './home-hero-section-full/home-hero-section-full.component';

@NgModule({
  declarations: [
    CategorySectionSmallCardsContentDownComponent,
    HomeHeroSectionFullComponent,
  ],
  imports: [CommonModule, ComponentsModule, RouterModule, SwiperModule],
  exports: [
    CategorySectionSmallCardsContentDownComponent,
    HomeHeroSectionFullComponent,
    CommonModule,
  ],
})
export class SectionsModule {}
