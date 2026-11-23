import { ComponentsModule } from 'src/app/components/components.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PersonalitySingleRoutingModule } from './personality-single-routing.module';
import { PersonalitySingleComponent } from './personality-single.component';

@NgModule({
    imports: [
        CommonModule,
        PersonalitySingleRoutingModule,
        PipesModule,
        DirectivesModule,
        ComponentsModule,
        PersonalitySingleComponent,
    ],
})
export class PersonalitySingleModule {}
