import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizApplyRoutingModule } from './quiz-apply-routing.module';
import { QuizApplyComponent } from './quiz-apply.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuizApplyComponent],
  imports: [CommonModule, QuizApplyRoutingModule, ReactiveFormsModule],
})
export class QuizApplyModule {}
