import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpXhrBackend,
} from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { QuizUpload } from '../interfaces/quiz-upload.model';

/**
 * Backend for the video upload. The app's HttpClient uses fetch, which can't
 * report upload progress, so the upload goes through XHR instead. Uploads only
 * happen in the browser (on submit), so the deprecated server-side XHR is never
 * used. Specs provide the testing backend here.
 */
export const QUIZ_UPLOAD_BACKEND = new InjectionToken<HttpBackend>(
  'QUIZ_UPLOAD_BACKEND',
  { providedIn: 'root', factory: () => inject(HttpXhrBackend) },
);

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  /** XHR-backed client (bypasses app interceptors; none apply to uploads). */
  private http = new HttpClient(inject(QUIZ_UPLOAD_BACKEND));

  uploadVideo(quizData: QuizUpload, file: File) {
    if (quizData.already_participated === '0') {
      // const params = new HttpParams()
      //   .set('recaptcha_response', quizData.recaptcha_response)
      //   .set('name', quizData.name)
      //   .set('dob', quizData.dob)
      //   .set('place_of_residence', quizData.place_of_residence)
      //   .set('already_participated', quizData.already_participated)
      //   .set('phone', quizData.phone)
      //   .set('email', quizData.email)
      //   .set('occupation', quizData.occupation)
      //   .set('agreed_to_audition_rules', quizData.agreed_to_audition_rules)
      //   .set(
      //     'agreed_with_the_processing_of_personal_data',
      //     quizData.agreed_with_the_processing_of_personal_data,
      //   );
      const form = new FormData();
      form.append('recaptcha_response', quizData.recaptcha_response);
      form.append('name', quizData.name);
      form.append('dob', quizData.dob);
      form.append('place_of_residence', quizData.place_of_residence);
      form.append('already_participated', quizData.already_participated);
      form.append('phone', quizData.phone);
      form.append('email', quizData.email);
      form.append('occupation', quizData.occupation);
      form.append(
        'agreed_to_audition_rules',
        quizData.agreed_to_audition_rules,
      );
      form.append(
        'agreed_with_the_processing_of_personal_data',
        quizData.agreed_with_the_processing_of_personal_data,
      );
      form.append('video', file, file.name);
      // console.log(params);

      return this.http.post(
        'https://staging-upload-una.qdevs-demo.com/quiz-request.php',
        form,
        {
          // params,
          headers: new HttpHeaders().set('Accept', 'application/json'),
          reportProgress: true,
          observe: 'events',
        },
      );
    } else {
      // const params = new HttpParams()
      //   .set('recaptcha_response', quizData.recaptcha_response)
      //   .set('name', quizData.name)
      //   .set('dob', quizData.dob)
      //   .set('place_of_residence', quizData.place_of_residence)
      //   .set('already_participated', quizData.already_participated)
      //   .set('phone', quizData.phone)
      //   .set('email', quizData.email)
      //   .set('occupation', quizData.occupation)
      //   .set('agreed_to_audition_rules', quizData.agreed_to_audition_rules)
      //   .set(
      //     'agreed_with_the_processing_of_personal_data',
      //     quizData.agreed_with_the_processing_of_personal_data,
      //   )
      //   .set(
      //     'already_participated_description',
      //     quizData.already_participated_description
      //       ? quizData.already_participated_description
      //       : '',
      //   );

      const form = new FormData();
      form.append('recaptcha_response', quizData.recaptcha_response);
      form.append('name', quizData.name);
      form.append('dob', quizData.dob);
      form.append('place_of_residence', quizData.place_of_residence);
      form.append('already_participated', quizData.already_participated);
      form.append('phone', quizData.phone);
      form.append('email', quizData.email);
      form.append('occupation', quizData.occupation);
      form.append(
        'agreed_to_audition_rules',
        quizData.agreed_to_audition_rules,
      );
      form.append(
        'agreed_with_the_processing_of_personal_data',
        quizData.agreed_with_the_processing_of_personal_data,
      );
      form.append(
        'already_participated_description',
        quizData.already_participated_description ?? '',
      );
      form.append('video', file, file.name);
      // console.log(params);

      return this.http.post(
        'https://staging-upload-una.qdevs-demo.com/quiz-request.php',
        form,
        {
          // params,
          headers: new HttpHeaders().set('Accept', 'application/json'),
          reportProgress: true,
          observe: 'events',
        },
      );
    }
  }
}
