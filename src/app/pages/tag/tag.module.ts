import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';


@NgModule({
    imports: [
    CommonModule,
    TagRoutingModule,
    NgxPaginationModule,
    TagComponent,
],
})
export class TagModule {}
