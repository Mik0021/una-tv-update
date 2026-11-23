import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        TagRoutingModule,
        ComponentsModule,
        NgxPaginationModule,
        TagComponent,
    ],
})
export class TagModule {}
