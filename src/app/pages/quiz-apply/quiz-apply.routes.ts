import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha-2';
import { environment } from 'src/environments/environment';
import { QuizApplyComponent } from './quiz-apply.component';

export const QUIZ_APPLY_ROUTES: Routes = [
  {
    path: '',
    component: QuizApplyComponent,
    providers: [
      importProvidersFrom(RecaptchaV3Module),
      {
        provide: RECAPTCHA_V3_SITE_KEY,
        useValue: environment.APP_RECAPTCHA_PUBLIC_KEY,
      },
    ],
  },
];
