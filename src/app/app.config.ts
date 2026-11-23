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
    // Zoneless is the default since v21; keep zone.js until Phase 5.
    provideZoneChangeDetection(),
    // Initial navigation stays non-blocking (the provideRouter default, same as
    // the old `initialNavigation: 'enabledNonBlocking'`).
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
    ),
    // XHR, not fetch: the quiz video upload needs upload progress events, which
    // the fetch backend doesn't support.
    provideHttpClient(withXhr()),
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
