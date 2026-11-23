import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardSmallContentDownComponent } from './card-small-content-down/card-small-content-down.component';
import { PersonalityCardComponent } from './personality-card/personality-card.component';
import { PersonalityHomeCardComponent } from './personality-home-card/personality-home-card.component';

@NgModule({
    imports: [CommonModule, RouterModule, CardSmallContentDownComponent,
        PersonalityCardComponent,
        PersonalityHomeCardComponent],
    exports: [
        CardSmallContentDownComponent,
        PersonalityCardComponent,
        PersonalityHomeCardComponent,
        CommonModule,
    ],
})
export class ComponentsModule {}
