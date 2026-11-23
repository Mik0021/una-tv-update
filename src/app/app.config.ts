import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import localeBa from '@angular/common/locales/sr-Latn-BA';
import {
  APP_ID,
  ApplicationConfig,
  LOCALE_ID,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeBa);

export const appConfig: ApplicationConfig = {
  providers: [
    // No zone.js: change detection runs on signal changes, template/host
    // listeners, markForCheck() and pending tasks (HTTP, resources) for SSR.
    provideZonelessChangeDetection(),
    // Initial navigation stays non-blocking (the provideRouter default, same as
    // the old `initialNavigation: 'enabledNonBlocking'`).
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
    ),
    // fetch everywhere (XHR on the server is deprecated). The quiz upload, which
    // needs upload progress, uses its own XHR backend (see QuizService).
    provideHttpClient(withFetch()),
    // Reuses the server-rendered DOM instead of re-rendering it. Hosts that run
    // third-party scripts opt out with ngSkipHydration (see HtmlEmbedComponent).
    // Incremental hydration (`@defer (hydrate on viewport)`) was measured on the
    // home carousels and left out: most of them are in the first viewport even
    // on phones, so it saved little and added ~11 kB to the initial bundle.
    provideClientHydration(
      withEventReplay(),
      // HTTP transfer cache: API responses fetched during SSR are embedded in
      // the page so the browser doesn't request them again while hydrating.
      // - includeNonCacheableRequests: the UNA API marks every response
      //   `Cache-Control: no-cache, private` (Laravel default) although it is
      //   public, cookie-less content that the HTML already contains.
      // - includePostRequests: search is a read-only POST. The cache only applies
      //   until the app is stable, so user-triggered POSTs (quiz) never hit it.
      withHttpTransferCacheOptions({
        includeNonCacheableRequests: true,
        includePostRequests: true,
      }),
    ),
    // Formerly BrowserModule.withServerTransition({ appId: 'serverApp' })
    { provide: APP_ID, useValue: 'serverApp' },
    { provide: LOCALE_ID, useValue: 'sr-Latn-BA' },
  ],
};
