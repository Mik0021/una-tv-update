import { Injectable, NgZone, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Current vertical scroll position as a signal (always 0 on the server).
 * Fed by one passive listener registered outside the Angular zone, so
 * scrolling doesn't trigger change detection by itself; only views that read
 * a value which actually changed are updated.
 */
@Injectable({ providedIn: 'root' })
export class WindowScrollService {
  private readonly y = signal(0);
  readonly scrollY = this.y.asReadonly();

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    inject(NgZone).runOutsideAngular(() => {
      const update = () => this.y.set(window.scrollY);
      window.addEventListener('scroll', update, { passive: true });
      update();
    });
  }
}
