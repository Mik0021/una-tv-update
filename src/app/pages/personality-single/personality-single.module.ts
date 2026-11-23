
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { PersonalitySingleRoutingModule } from './personality-single-routing.module';
import { PersonalitySingleComponent } from './personality-single.component';

@NgModule({
    imports: [
    CommonModule,
    PersonalitySingleRoutingModule,
    PersonalitySingleComponent,
],
})
export class PersonalitySingleModule {}
