import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizApplyRoutingModule } from './quiz-apply-routing.module';
import { QuizApplyComponent } from './quiz-apply.component';


@NgModule({
  declarations: [
    QuizApplyComponent
  ],
  imports: [
    CommonModule,
    QuizApplyRoutingModule
  ]
})
export class QuizApplyModule { }
