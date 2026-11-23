import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        SearchRoutingModule,
        ComponentsModule,
        NgxPaginationModule,
        SearchComponent,
    ],
})
export class SearchModule {}
