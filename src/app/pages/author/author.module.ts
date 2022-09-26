import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    ComponentsModule,
    NgxPaginationModule,
  ],
})
export class AuthorModule {}
