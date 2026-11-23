import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalityListRoutingModule } from './personality-list-routing.module';
import { PersonalityListComponent } from './personality-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        PersonalityListRoutingModule,
        ComponentsModule,
        NgxPaginationModule,
        PersonalityListComponent,
    ],
})
export class PersonalityListModule {}
