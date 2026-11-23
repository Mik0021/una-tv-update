import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  ElementRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha-2';
import { finalize, switchMap } from 'rxjs';
import { QuizUpload } from 'src/app/interfaces/quiz-upload.model';
import { QuizService } from 'src/app/services/quiz.service';
import { AgeValidator } from './age.validator';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NavService } from 'src/app/services/nav.service';
import { SeoService } from 'src/app/services/seo.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-quiz-apply',
  templateUrl: './quiz-apply.component.html',
  styleUrls: ['./quiz-apply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
})
export class QuizApplyComponent implements AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private recaptchaV3Service = inject(ReCaptchaV3Service);
  private _document = inject<Document>(DOCUMENT);
  private quizService = inject(QuizService);
  private el = inject(ElementRef);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private seo = inject(SeoService);

  protected readonly videoTypeError = signal(false);
  protected readonly videoSizeError = signal(false);
  protected readonly videoFileName = signal('');
  /** Latest allowed date of birth (18 years ago), for the date input. */
  protected readonly maxAge = (() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  })();
  protected readonly progress = signal(0);
  protected readonly uploadSuccess = signal(false);
  quizForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    dob: ['', [Validators.required, AgeValidator]],
    place_of_residence: ['', [Validators.required, Validators.maxLength(100)]],
    occupation: ['', [Validators.required, Validators.maxLength(100)]],
    already_participated: new FormControl<'0' | '1' | null>(null, [
      Validators.required,
    ]),
    already_participated_description: [{ value: '', disabled: true }],
    phone: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(100)],
    ],
    video: new FormControl<File | null>(null, [Validators.required]),
    agreed_to_audition_rules: [
      false,
      [Validators.required, Validators.requiredTrue],
    ],
    agreed_with_the_processing_of_personal_data: [
      false,
      [Validators.required, Validators.requiredTrue],
    ],
  });

  get name() {
    return this.quizForm.controls.name;
  }
  get dob() {
    return this.quizForm.controls.dob;
  }
  get place_of_residence() {
    return this.quizForm.controls.place_of_residence;
  }
  get occupation() {
    return this.quizForm.controls.occupation;
  }
  get already_participated() {
    return this.quizForm.controls.already_participated;
  }
  get already_participated_description() {
    return this.quizForm.controls.already_participated_description;
  }
  get phone() {
    return this.quizForm.controls.phone;
  }
  get email() {
    return this.quizForm.controls.email;
  }
  get video() {
    return this.quizForm.controls.video;
  }
  get agreed_to_audition_rules() {
    return this.quizForm.controls.agreed_to_audition_rules;
  }
  get agreed_with_the_processing_of_personal_data() {
    return this.quizForm.controls.agreed_with_the_processing_of_personal_data;
  }

  constructor() {
    this.setSeo();
    // Leave the page once the menu says the quiz is closed.
    const quizEnabled = inject(NavService).quizEnabled;
    effect(() => {
      if (quizEnabled() === false) {
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.already_participated.valueChanges.subscribe({
      next: (res) => {
        if (res === '1') {
          this.already_participated_description.enable();
          this.already_participated_description.setValidators([
            Validators.required,
            Validators.maxLength(1024),
          ]);
          this.already_participated_description.updateValueAndValidity();
        }
        if (res === '0') {
          this.already_participated_description.removeValidators([
            Validators.required,
            Validators.maxLength(1024),
          ]);
          this.already_participated_description.setValue('');
          this.already_participated_description.disable();
        }
      },
    });
  }

  onVideoUpload(videoUpload: HTMLInputElement) {
    videoUpload.value = '';
    videoUpload.click();
    this.video.markAsTouched();
  }

  onFileSelected(event: Event) {
    let video: FileList | null = null;
    this.videoSizeError.set(false);
    this.videoTypeError.set(false);
    this.videoFileName.set('');
    video = (event.target as HTMLInputElement).files;
    // console.log(video);
    if (video !== null) {
      if (video.length > 0) {
        // console.log(video[0]);
        if (video[0].type !== 'video/mp4') {
          this.videoTypeError.set(true);
        } else {
          this.videoTypeError.set(false);
        }
        if (video[0].size > 500000000) {
          this.videoSizeError.set(true);
        } else {
          this.videoSizeError.set(false);
        }
        if (!this.videoSizeError() && !this.videoTypeError()) {
          this.video.patchValue(video[0]);
          this.videoFileName.set(video[0].name);
        }
      }
    }
  }

  submit() {
    if (
      this.quizForm.valid &&
      !this.videoSizeError() &&
      !this.videoTypeError()
    ) {
      this.quizForm.disable();
      // console.log(this.quizForm.value);

      this.recaptchaV3Service
        .execute('importantAction')
        .pipe(
          switchMap((token) => {
            const quizData: QuizUpload = {
              recaptcha_response: token,
              name: this.name.value!,
              dob: this.dob.value!,
              place_of_residence: this.place_of_residence.value!,
              already_participated: this.already_participated.value!,
              already_participated_description:
                this.already_participated_description.value!,
              phone: this.phone.value!,
              email: this.email.value!,
              occupation: this.occupation.value!,
              agreed_to_audition_rules: '1',
              agreed_with_the_processing_of_personal_data: '1',
            };
            // console.log(quizData);
            return this.quizService.uploadVideo(quizData, this.video.value!);
          }),
        )
        // const quizData: QuizUpload = {
        //   recaptcha_response: '8fde3b6feba52d91febb01',
        //   name: this.name.value!,
        //   dob: this.dob.value!,
        //   place_of_residence: this.place_of_residence.value!,
        //   already_participated: this.already_participated.value!,
        //   already_participated_description:
        //     this.already_participated_description.value!,
        //   phone: this.phone.value!,
        //   email: this.email.value!,
        //   occupation: this.occupation.value!,
        //   agreed_to_audition_rules: '1',
        //   agreed_with_the_processing_of_personal_data: '1',
        // };

        // this.quizService
        //   .uploadVideo(quizData, this.video.value!)
        .pipe(
          finalize(() => {
            this.quizForm.enable();
            this.already_participated_description.disable();
            this.already_participated_description.removeValidators([
              Validators.required,
              Validators.maxLength(1024),
            ]);
            // Form state isn't a signal: refresh the OnPush view explicitly.
            this.cdr.markForCheck();
          }),
        )
        .subscribe({
          next: (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress) {
              // console.log(event);
              this.progress.set(
                Math.round((event.loaded / event.total!) * 100),
              );
            }
            if (event.type === HttpEventType.Response) {
              // console.log(event);
              this.quizForm.reset();
              this.progress.set(0);
              this.uploadSuccess.set(true);
              this.videoSizeError.set(false);
              this.videoTypeError.set(false);
              this.videoFileName.set('');
              if (event.status === 201) {
              }
            }
          },
          error: (err) => {
            this.progress.set(0);
            // console.log(err);
          },
        });
    } else {
      this.quizForm.markAllAsTouched();
      this.quizForm.updateValueAndValidity();
      for (const key of Object.keys(this.quizForm.controls)) {
        if (
          ((this.quizForm as FormGroup).controls[key] as FormControl).invalid
        ) {
          const invalidControl = this.el.nativeElement.querySelector(
            '[formcontrolname="' + key + '"]',
          );
          if (invalidControl) {
            invalidControl.focus();
          }
          if (key === 'video') {
            this.el.nativeElement.querySelector('.video-upload-btn').focus();
          }
          break;
        }
      }
    }
  }

  private setSeo() {
    const description =
      'Una televizija svojim gledaocima pruža uzbudljiv kviz i mnošto zabave i izazova. Učesnike očekuje i vredna novčana nagrada, a potrebno je da se pored znanja pokaže i intuicija i veštine.';
    this.seo.set({
      title: 'UNA televizija kviz',
      description,
      keywords: 'UNA, kviz, jedno pitanje, una televizija',
      image: 'https://unatv.una.rs/assets/images/una-jedno-pitanje-share.webp',
      imageWidth: '1655',
      imageHeight: '931',
      twitterImage: `${this._document.location.origin}/assets/images/una-jedno-pitanje-share.webp`,
    });
  }
}
