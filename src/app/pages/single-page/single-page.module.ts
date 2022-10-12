import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'ngx-sharebuttons';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from './../../directives/directives.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ConectedNewsComponent } from './conected-news/conected-news.component';
import { SinglePageRoutingModule } from './single-page-routing.module';
import { SinglePageComponent } from './single-page.component';
import { SingleSocialComponent } from './single-social/single-social.component';
import { SingleTagsComponent } from './single-tags/single-tags.component';

@NgModule({
  declarations: [
    SinglePageComponent,
    SingleSocialComponent,
    SingleTagsComponent,
    ConectedNewsComponent,
  ],
  imports: [
    CommonModule,
    SinglePageRoutingModule,
    RouterModule,
    ShareModule,
    PipesModule,
    DirectivesModule,
    ComponentsModule,
  ],
})
export class SinglePageModule {}
