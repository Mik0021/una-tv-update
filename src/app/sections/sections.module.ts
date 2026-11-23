import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './../components/components.module';
import { CategorySectionSmallCardsContentDownComponent } from './category-section-small-cards-content-down/category-section-small-cards-content-down.component';
import { HomeHeroSectionFullComponent } from './home-hero-section-full/home-hero-section-full.component';
import { CategorySectionPersonalitiesComponent } from './category-section-personalities/category-section-personalities.component';

@NgModule({
    imports: [CommonModule, ComponentsModule, RouterModule, CategorySectionSmallCardsContentDownComponent,
        HomeHeroSectionFullComponent,
        CategorySectionPersonalitiesComponent],
    exports: [
        CategorySectionSmallCardsContentDownComponent,
        HomeHeroSectionFullComponent,
        CategorySectionPersonalitiesComponent,
        CommonModule,
    ],
    // <swiper-container>/<swiper-slide> are Swiper Element web components
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SectionsModule {}
