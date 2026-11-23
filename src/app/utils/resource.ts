import {
  Signal,
  effect,
  inject,
  linkedSignal,
  ResourceRef,
} from '@angular/core';
import { Router } from '@angular/router';

/**
 * The resource's latest successful value, kept while a new request (e.g. the
 * next page) loads or after it fails. `resource.value()` would drop back to
 * undefined during loading, blanking the page.
 */
export function lastValue<T>(
  resource: ResourceRef<T | undefined>,
): Signal<T | undefined> {
  return linkedSignal<T | undefined, T | undefined>({
    source: () => (resource.hasValue() ? resource.value() : undefined),
    computation: (value, previous) => value ?? previous?.value,
  });
}

/**
 * Shows the not-found page (HTTP 404 during SSR) when the resource fails.
 * The URL is kept (skipLocationChange): changing it during SSR would turn the
 * response into an empty redirect. Call in an injection context.
 */
export function notFoundOnError(resource: ResourceRef<unknown>): void {
  const router = inject(Router);
  effect(() => {
    if (resource.error()) {
      router.navigate(['404'], { skipLocationChange: true });
    }
  });
}
