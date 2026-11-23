import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalityListRoutingModule } from './personality-list-routing.module';
import { PersonalityListComponent } from './personality-list.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
    CommonModule,
    PersonalityListRoutingModule,
    NgxPaginationModule,
    PersonalityListComponent,
],
})
export class PersonalityListModule {}
