import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroCardLargeComponent } from './home-hero-card-large/home-hero-card-large.component';
import { HomeHeroCardSmallComponent } from './home-hero-card-small/home-hero-card-small.component';
import { NotificationIconsComponent } from './notification-icons/notification-icons.component';
import { CardSmallContentDownComponent } from './card-small-content-down/card-small-content-down.component';
import { CardLargeContentDownComponent } from './card-large-content-down/card-large-content-down.component';
import { CardSmallContentRightComponent } from './card-small-content-right/card-small-content-right.component';
import { HomeHeroCardSmallContentDownComponent } from './home-hero-card-small-content-down/home-hero-card-small-content-down.component';
import { NotificationIconsSmallComponent } from './notification-icons-small/notification-icons-small.component';
import { RouterModule } from '@angular/router';
import { CardSmallContentDownNoCatComponent } from './card-small-content-down-no-cat/card-small-content-down-no-cat.component';
import { CardLargeContentDownNoCatComponent } from './card-large-content-down-no-cat/card-large-content-down-no-cat.component';
import { PersonalityCardComponent } from './personality-card/personality-card.component';

@NgModule({
  declarations: [
    HomeHeroCardLargeComponent,
    HomeHeroCardSmallComponent,
    NotificationIconsComponent,
    CardSmallContentDownComponent,
    CardLargeContentDownComponent,
    CardSmallContentRightComponent,
    HomeHeroCardSmallContentDownComponent,
    NotificationIconsSmallComponent,
    CardSmallContentDownNoCatComponent,
    CardLargeContentDownNoCatComponent,
    PersonalityCardComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HomeHeroCardLargeComponent,
    HomeHeroCardSmallComponent,
    NotificationIconsComponent,
    CardSmallContentDownComponent,
    CardLargeContentDownComponent,
    CardSmallContentRightComponent,
    HomeHeroCardSmallContentDownComponent,
    CardSmallContentDownNoCatComponent,
    CardLargeContentDownNoCatComponent,
    PersonalityCardComponent,
    CommonModule,
  ],
})
export class ComponentsModule {}
