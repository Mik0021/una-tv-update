import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardSmallContentDownComponent } from './card-small-content-down/card-small-content-down.component';
import { PersonalityCardComponent } from './personality-card/personality-card.component';

@NgModule({
  declarations: [CardSmallContentDownComponent, PersonalityCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    CardSmallContentDownComponent,
    PersonalityCardComponent,
    CommonModule,
  ],
})
export class ComponentsModule {}
