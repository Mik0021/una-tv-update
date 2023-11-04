import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-apply',
  templateUrl: './quiz-apply.component.html',
  styleUrls: ['./quiz-apply.component.scss'],
})
export class QuizApplyComponent implements OnInit, AfterViewInit {
  videoTypeError = false;
  videoSizeError = false;
  videoFileName = '';

  quizForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    residency: ['', [Validators.required]],
    ocupation: ['', [Validators.required]],
    otherQuizesCheck: ['', [Validators.required]],
    otherQuizes: [''],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    video: new FormControl<File | null>(null, [Validators.required]),
    auditionRules: [false, [Validators.required, Validators.requiredTrue]],
    dataPrivacy: [false, [Validators.required, Validators.requiredTrue]],
  });

  get name() {
    return this.quizForm.controls.name;
  }
  get birthDate() {
    return this.quizForm.controls.birthDate;
  }
  get residency() {
    return this.quizForm.controls.residency;
  }
  get ocupation() {
    return this.quizForm.controls.ocupation;
  }
  get otherQuizesCheck() {
    return this.quizForm.controls.otherQuizesCheck;
  }
  get otherQuizes() {
    return this.quizForm.controls.otherQuizes;
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
  get auditionRules() {
    return this.quizForm.controls.auditionRules;
  }
  get dataPrivacy() {
    return this.quizForm.controls.dataPrivacy;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.otherQuizes.disable();
    this.quizForm.valueChanges.subscribe((res) => {
      // console.log(res);
    });
  }

  ngAfterViewInit(): void {
    this.otherQuizesCheck.valueChanges.subscribe({
      next: (res) => {
        if (res === 'true') {
          this.otherQuizes.enable();
          this.otherQuizes.setValidators([Validators.required]);
          this.otherQuizes.updateValueAndValidity();
        }
        if (res === 'false') {
          this.otherQuizes.removeValidators([Validators.required]);
          this.otherQuizes.disable();
        }
      },
    });
  }

  onVideoUpload(videoUpload: HTMLInputElement) {
    videoUpload.click();
    this.video.markAsTouched();
  }

  onFileSelected(event: Event) {
    const video: FileList | null = (event.target as HTMLInputElement).files;
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
      console.log(this.quizForm.value);
    } else {
      this.quizForm.markAllAsTouched();
      this.quizForm.updateValueAndValidity();
    }
  }
}
