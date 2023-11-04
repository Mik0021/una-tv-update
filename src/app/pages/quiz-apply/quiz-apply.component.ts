import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-apply',
  templateUrl: './quiz-apply.component.html',
  styleUrls: ['./quiz-apply.component.scss'],
})
export class QuizApplyComponent implements OnInit, AfterViewInit {
  quizForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    residency: ['', [Validators.required]],
    ocupation: ['', [Validators.required]],
    otherQuizesCheck: ['', [Validators.required]],
    otherQuizes: [''],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
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
      console.log(res);
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

  submit() {
    console.log(this.quizForm.value, this.quizForm.valid);
    console.log(this.name);
  }
}
