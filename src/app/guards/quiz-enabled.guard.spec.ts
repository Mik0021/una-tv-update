import {
  EnvironmentInjector,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NavService } from '../services/nav.service';
import { quizEnabledGuard } from './quiz-enabled.guard';

describe('quizEnabledGuard', () => {
  const quizEnabled = signal<boolean | undefined>(undefined);

  beforeEach(() => {
    quizEnabled.set(undefined);
    TestBed.configureTestingModule({
      providers: [{ provide: NavService, useValue: { quizEnabled } }],
    });
  });

  const run = () =>
    runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
      quizEnabledGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ) as Observable<boolean>;

  it('waits for the menu, then resolves to the quiz flag', () => {
    const results: boolean[] = [];
    run().subscribe((v) => results.push(v));
    TestBed.tick();
    expect(results).toEqual([]);

    quizEnabled.set(false);
    TestBed.tick();
    expect(results).toEqual([false]);
  });
});
