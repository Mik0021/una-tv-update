import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizUpload } from '../interfaces/quiz-upload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  uploadVideo(quizData: QuizUpload, file: File) {
    if (quizData.already_participated === '0') {
      const params = new HttpParams()
        .set('recaptcha_response', quizData.recaptcha_response)
        .set('name', quizData.name)
        .set('dob', quizData.dob)
        .set('place_of_residence', quizData.place_of_residence)
        .set('already_participated', quizData.already_participated)
        .set('phone', quizData.phone)
        .set('email', quizData.email)
        .set('occupation', quizData.occupation)
        .set('agreed_to_audition_rules', quizData.agreed_to_audition_rules)
        .set(
          'agreed_with_the_processing_of_personal_data',
          quizData.agreed_with_the_processing_of_personal_data
        );
      const form = new FormData();
      form.append('video', file, file.name);
      console.log(params);

      return this.http.post(
        `${environment.API_UNA}${environment.API_QUIZ}`,
        form,
        {
          params,
          reportProgress: true,
          observe: 'events',
        }
      );
    } else {
      const params = new HttpParams()
        .set('recaptcha_response', quizData.recaptcha_response)
        .set('name', quizData.name)
        .set('dob', quizData.dob)
        .set('place_of_residence', quizData.place_of_residence)
        .set('already_participated', quizData.already_participated)
        .set('phone', quizData.phone)
        .set('email', quizData.email)
        .set('occupation', quizData.occupation)
        .set('agreed_to_audition_rules', quizData.agreed_to_audition_rules)
        .set(
          'agreed_with_the_processing_of_personal_data',
          quizData.agreed_with_the_processing_of_personal_data
        )
        .set(
          'already_participated_description',
          quizData.already_participated_description
            ? quizData.already_participated_description
            : ''
        );

      const form = new FormData();
      form.append('video', file, file.name);
      console.log(params);

      return this.http.post(
        `${environment.API_UNA}${environment.API_QUIZ}`,
        form,
        {
          params,
          reportProgress: true,
          observe: 'events',
        }
      );
    }
  }
}
