import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeLivePreviewRoutingModule } from './home-live-preview-routing.module';
import { HomeLivePreviewComponent } from './home-live-preview.component';
import { SectionsModule } from 'src/app/sections/sections.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomeLivePreviewComponent],
  imports: [
    CommonModule,
    HomeLivePreviewRoutingModule,
    ComponentsModule,
    SectionsModule,
  ],
})
export class HomeLivePreviewModule {}
