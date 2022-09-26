import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ShareModule } from 'ngx-sharebuttons';
import { LivePreviewRoutingModule } from './live-preview-routing.module';
import { LivePreviewComponent } from './live-preview.component';

import { LivePreviewSocialComponent } from './live-preview-social/live-preview-social.component';
import { LivePreviewTagsComponent } from './live-preview-tags/live-preview-tags.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    LivePreviewComponent,
    LivePreviewTagsComponent,
    LivePreviewSocialComponent,
  ],
  imports: [
    CommonModule,
    LivePreviewRoutingModule,
    RouterModule,
    ShareModule,
    PipesModule,
    DirectivesModule,
  ],
})
export class LivePreviewModule {}
