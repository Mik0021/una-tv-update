import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentCategoryRoutingModule } from './parent-category-routing.module';
import { ParentCategoryComponent } from './parent-category.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
    CommonModule,
    ParentCategoryRoutingModule,
    NgxPaginationModule,
    ParentCategoryComponent,
],
})
export class ParentCategoryModule {}
