import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavService } from '../services/nav.service';
import { quizEnabledGuard } from './quiz-enabled.guard';

describe('quizEnabledGuard', () => {
  const quizEnabled = new BehaviorSubject<boolean | undefined>(undefined);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NavService, useValue: { quizEnabled$: quizEnabled } },
      ],
    });
  });

  it('waits for the menu, then resolves to the quiz flag', (done) => {
    const result = runInInjectionContext(
      TestBed.inject(EnvironmentInjector),
      () =>
        quizEnabledGuard(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot,
        ),
    ) as Observable<boolean>;
    result.subscribe((v) => {
      expect(v).toBeTrue();
      done();
    });
    quizEnabled.next(true);
  });
});
