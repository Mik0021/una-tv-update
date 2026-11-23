import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { filter, take } from 'rxjs';
import { NavService } from '../services/nav.service';

/** Waits for the menu to load, then allows navigation only if the quiz is enabled. */
export const quizEnabledGuard: CanActivateFn = () =>
  toObservable(inject(NavService).quizEnabled).pipe(
    filter((enabled): enabled is boolean => enabled !== undefined),
    take(1),
  );
