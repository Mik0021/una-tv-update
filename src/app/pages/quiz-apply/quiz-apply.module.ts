import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizApplyRoutingModule } from './quiz-apply-routing.module';
import { QuizApplyComponent } from './quiz-apply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [QuizApplyComponent],
  imports: [
    CommonModule,
    QuizApplyRoutingModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.APP_RECAPTCHA_PUBLIC_KEY,
    },
  ],
})
export class QuizApplyModule {}
