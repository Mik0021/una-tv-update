import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentCategoryRoutingModule } from './parent-category-routing.module';
import { ParentCategoryComponent } from './parent-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ParentCategoryComponent],
  imports: [
    CommonModule,
    ParentCategoryRoutingModule,
    ComponentsModule,
    NgxPaginationModule,
  ],
})
export class ParentCategoryModule {}
