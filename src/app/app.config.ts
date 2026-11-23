import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withXhr } from '@angular/common/http';
import localeBa from '@angular/common/locales/sr-Latn-BA';
import {
  APP_ID,
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeBa);

export const appConfig: ApplicationConfig = {
  providers: [
    // Zoneless is the default since v21; keep zone.js until Phase 5.
    provideZoneChangeDetection(),
    // Initial navigation stays non-blocking (the provideRouter default, same as
    // the old `initialNavigation: 'enabledNonBlocking'`).
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
    ),
    // XHR until Phase 3 switches to fetch + the hydration transfer cache.
    provideHttpClient(withXhr()),
    // Formerly BrowserModule.withServerTransition({ appId: 'serverApp' })
    { provide: APP_ID, useValue: 'serverApp' },
    { provide: LOCALE_ID, useValue: 'sr-Latn-BA' },
  ],
};
