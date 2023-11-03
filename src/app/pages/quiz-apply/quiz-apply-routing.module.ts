import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizApplyComponent } from './quiz-apply.component';

const routes: Routes = [{ path: '', component: QuizApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizApplyRoutingModule { }
