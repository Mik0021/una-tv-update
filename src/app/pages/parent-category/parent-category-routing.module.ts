import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentCategoryComponent } from './parent-category.component';

const routes: Routes = [{ path: '', component: ParentCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentCategoryRoutingModule { }
