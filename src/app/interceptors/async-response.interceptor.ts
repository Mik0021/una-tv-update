import { HttpInterceptorFn } from '@angular/common/http';
import { asyncScheduler, observeOn } from 'rxjs';

/**
 * Delivers every HTTP response asynchronously (next macrotask), like a real
 * network response.
 *
 * The services push results into plain `Subject`s, and pages trigger
 * `service.getX()` *before* subscribing to `x$` (often the request starts in the
 * constructor and the subscription happens in ngOnInit, which the router runs
 * in a later change-detection pass). Hydration's HTTP transfer cache returns
 * cached responses synchronously, which would emit before the page subscribes
 * and lose the data. A microtask is not enough for the constructor/ngOnInit
 * case. User interceptors run before the transfer-cache interceptor, so this
 * also covers cache hits. Zone.js tracks the timer, so the app doesn't become
 * stable (and drop unclaimed server-rendered DOM) before the data arrives.
 *
 * Temporary: remove once the services move to signals/httpResource (Phase 4).
 */
export const asyncResponseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(observeOn(asyncScheduler));
