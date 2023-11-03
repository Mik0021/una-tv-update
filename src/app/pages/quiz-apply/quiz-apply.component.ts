import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-apply',
  templateUrl: './quiz-apply.component.html',
  styleUrls: ['./quiz-apply.component.scss'],
})
export class QuizApplyComponent implements OnInit {
  quizForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    residency: ['', [Validators.required]],
    ocupation: ['', [Validators.required]],
    otherQuizes: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
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
  get otherQuizes() {
    return this.quizForm.controls.otherQuizes;
  }
  get phone() {
    return this.quizForm.controls.phone;
  }
  get email() {
    return this.quizForm.controls.email;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.quizForm.value, this.quizForm.valid);
  }
}
