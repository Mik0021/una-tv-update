import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLivePreviewComponent } from './home-live-preview.component';

const routes: Routes = [{ path: '', component: HomeLivePreviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLivePreviewRoutingModule { }
