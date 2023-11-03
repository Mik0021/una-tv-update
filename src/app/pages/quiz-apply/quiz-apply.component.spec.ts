import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizApplyComponent } from './quiz-apply.component';

describe('QuizApplyComponent', () => {
  let component: QuizApplyComponent;
  let fixture: ComponentFixture<QuizApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
