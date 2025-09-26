import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { finalize, switchMap } from 'rxjs';
import { QuizUpload } from 'src/app/interfaces/quiz-upload.model';
import { QuizService } from 'src/app/services/quiz.service';
import { AgeValidator } from './age.validator';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NavService } from 'src/app/services/nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-apply',
  templateUrl: './quiz-apply.component.html',
  styleUrls: ['./quiz-apply.component.scss'],
})
export class QuizApplyComponent implements OnInit, AfterViewInit, OnDestroy {
  videoTypeError = false;
  videoSizeError = false;
  videoFileName = '';
  maxAge = '';
  progress = 0;
  uploadSuccess = false;
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

  constructor(
    private formBuilder: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private metaService: Meta,
    private titleService: Title,
    private quizService: QuizService,
    private el: ElementRef,
    private navService: NavService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addTags();
    let today = new Date();
    today.setTime(today.setFullYear(today.getFullYear() - 18));
    this.maxAge = today.toISOString().split('T')[0];
    // this.quizForm.valueChanges.subscribe((res) => {
    //   console.log(res);
    // });
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
    this.navService.quizEnabled$.subscribe({
      next: (res) => {
        if (res === false) {
          this.router.navigate(['/']);
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
    this.videoSizeError = false;
    this.videoTypeError = false;
    this.videoFileName = '';
    video = (event.target as HTMLInputElement).files;
    // console.log(video);
    if (video !== null) {
      if (video.length > 0) {
        // console.log(video[0]);
        if (video[0].type !== 'video/mp4') {
          this.videoTypeError = true;
        } else {
          this.videoTypeError = false;
        }
        if (video[0].size > 500000000) {
          this.videoSizeError = true;
        } else {
          this.videoSizeError = false;
        }
        if (!this.videoSizeError && !this.videoTypeError) {
          this.video.patchValue(video[0]);
          this.videoFileName = video[0].name;
        }
      }
    }
  }

  submit() {
    if (this.quizForm.valid && !this.videoSizeError && !this.videoTypeError) {
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
          })
        )
        .pipe(
          finalize(() => {
            this.quizForm.enable();
            this.already_participated_description.disable();
            this.already_participated_description.removeValidators([
              Validators.required,
              Validators.maxLength(1024),
            ]);
          })
        )
        .subscribe({
          next: (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress) {
              // console.log(event);
              this.progress = Math.round((event.loaded / event.total!) * 100);
            }
            if (event.type === HttpEventType.Response) {
              // console.log(event);
              this.quizForm.reset();
              this.progress = 0;
              this.uploadSuccess = true;
              this.videoSizeError = false;
              this.videoTypeError = false;
              this.videoFileName = '';
              if (event.status === 201) {
              }
            }
          },
          error: (err) => {
            this.progress = 0;
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
            '[formcontrolname="' + key + '"]'
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

  addTags() {
    this.titleService.setTitle('UNA televizija kviz');

    this.metaService.updateTag({
      name: 'description',
      content:
        'Una televizija svojim gledaocima pruža uzbudljiv kviz i mnošto zabave i izazova. Učesnike očekuje i vredna novčana nagrada, a potrebno je da se pored znanja pokaže i intuicija i veštine.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'UNA, kviz, jedno pitanje, una televizija',
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'UNA televizija kviz',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Una televizija svojim gledaocima pruža uzbudljiv kviz i mnošto zabave i izazova. Učesnike očekuje i vredna novčana nagrada, a potrebno je da se pored znanja pokaže i intuicija i veštine.',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: `https://unatv.una.rs/assets/images/una-jedno-pitanje-share.jpg`,
    });
    this.metaService.updateTag({
      property: 'og:image:width',
      content: '1655',
    });
    this.metaService.updateTag({
      property: 'og:image:height',
      content: '931',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: `${this._document.location.href}`,
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      name: 'twitter:site',
      content: '@',
    });
    this.metaService.updateTag({
      name: 'twitter:creator',
      content: `${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:domain',
      content: `${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'UNA televizija kviz',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Una televizija svojim gledaocima pruža uzbudljiv kviz i mnošto zabave i izazova. Učesnike očekuje i vredna novčana nagrada, a potrebno je da se pored znanja pokaže i intuicija i veštine.',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: `${this._document.location.origin}/assets/images/una-jedno-pitanje-share.jpg`,
    });
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
