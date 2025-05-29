import { TestBed } from '@angular/core/testing';

import { QuizEnabledGuard } from './quiz-enabled.guard';

describe('QuizEnabledGuard', () => {
  let guard: QuizEnabledGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuizEnabledGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
