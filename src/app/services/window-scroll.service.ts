import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/**
 * Current vertical scroll position as a signal (always 0 on the server), fed
 * by one passive scroll listener. The app is zoneless, so a scroll event only
 * updates the views that read a value which actually changed.
 */
@Injectable({ providedIn: 'root' })
export class WindowScrollService {
  private readonly y = signal(0);
  readonly scrollY = this.y.asReadonly();

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    const update = () => this.y.set(window.scrollY);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
}
