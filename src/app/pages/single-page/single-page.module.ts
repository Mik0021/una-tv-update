import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareButtonDirective } from 'ngx-sharebuttons';



import { ConectedNewsComponent } from './conected-news/conected-news.component';
import { SinglePageRoutingModule } from './single-page-routing.module';
import { SinglePageComponent } from './single-page.component';
import { SingleSocialComponent } from './single-social/single-social.component';
import { SingleTagsComponent } from './single-tags/single-tags.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
    CommonModule,
    SinglePageRoutingModule,
    RouterModule,
    ShareButtonDirective,
    NgxPaginationModule,
    SinglePageComponent,
    SingleSocialComponent,
    SingleTagsComponent,
    ConectedNewsComponent,
],
})
export class SinglePageModule {}
