import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryListRoutingModule } from './category-list-routing.module';
import { CategoryListComponent } from './category-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        CategoryListRoutingModule,
        ComponentsModule,
        NgxPaginationModule,
        CategoryListComponent,
    ],
})
export class CategoryListModule {}
