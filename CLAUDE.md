# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

UNA TV portal: an **Angular 22** site with standalone components (no NgModules), built with the esbuild `application` builder. SSR runs through `@angular/ssr`'s `AngularNodeAppEngine` (`src/server.ts`, Express 5), with client hydration. Content (TV shows, categories, personalities, TV program, static pages, quiz applications) comes from the external UNA REST API; there is no backend in this repo. UI text and route slugs are in Serbian/Bosnian (`pretraga`, `nasa-lica`, `una-kviz`, `p/:static`).

The migration in `MIGRATION_PLAN.md` is complete on `feat/angular-22`. The app is zoneless (no zone.js) and uses signals, `httpResource`, signal inputs and OnPush everywhere. Requires Node ≥22.22 (`nvm use 24`). TypeScript 6. 
## Commands

- `npm start`: dev server (`ng serve`, development config, http://localhost:4200)
- `npm test`: Vitest unit tests (`@angular/build:unit-test`, jsdom, Vitest globals: `describe`/`it`/`expect`/`vi`). For a subset: `npx ng test --include 'src/app/path/**/*.spec.ts'`. Shared fixtures are in `src/testing/fixtures.ts`. In specs, `await fixture.whenStable()` waits for pending HTTP/resources, so flush `HttpTestingController` requests first. `destroyPlayer` (from `src/assets/brid.js`) must be stubbed for components that contain `app-html-embed`.
- `npm start` (`ng serve`) also server-renders; it uses `environment.ts`, which points at the **production** API.
- Per-site builds: `ng build --configuration=<site>` (one command builds browser and server), where `<site>` is one of `unabih`, `unasr`, `unahr`, `unaen` (test/staging) or the `...prod` variant. npm shortcuts exist only for Serbia: `npm run build:ssrsrb` / `npm run build:ssrsrbprod`.
- Output per site: `<base>/browser` (static files) and `<base>/server/server.mjs` (start with `node <base>/server/server.mjs`; port = `APP_PORT` from the environment). `npm run serve:ssr` runs `dist/server/server.mjs`.

There is no lint setup. Formatting uses Prettier with `singleQuote: true`.

Gotchas:
- The `build`/`server` targets default to a `production` configuration that is not defined in `angular.json`. Always pass an explicit `--configuration`.
- Requests are only served for hosts in `security.allowedHosts` in `angular.json` (or the `NG_ALLOWED_HOSTS` env var). Any other `Host` / `X-Forwarded-Host` gets **HTTP 400**. `src/server.ts` trusts `X-Forwarded-Proto`/`X-Forwarded-Host` from the reverse proxy, and server-side `document.location` (used for canonical/og:url) is built from them.
- Only `unasr`/`unasrprod` build. The other site environments lack TV-only keys (`API_TV_IS_SUBCATEGORY`, `API_PERSONALITIES`, `API_TV_PROGRAM`, ...).

## Multi-site setup via environments

One codebase serves several country sites. Each site has its own `src/environments/environment.<site>[prod].ts`, which is swapped in through `fileReplacements` in `angular.json`. Each build writes to a different output folder: `ba/`, `dist/` (sr), `hr/`, `en/`, each with a `/server` subfolder.

The environment object holds everything that differs between sites:
- `API_UNA` base URL plus endpoint paths (`API_POST`, `API_HOME`, ...). Endpoint paths **differ between sites**: the sr/tv environments use `/tv/...` paths, while some others (e.g. `unabihprod`) use `/articles/...`, `/categories/...` and lack TV-only keys such as `API_PERSONALITIES` and `API_TV_PROGRAM`.
- `APP_PORT`, `APP_SERVER_DIST_FOLDER` (used by `server.ts`), `APP_FOLDER`, language/locale strings, SEO meta defaults, the reCAPTCHA key, and `SITE_SELECT` (the country switcher in the header).

When adding a new API endpoint or config value, add it to **every** environment file, or the builds for the other sites will break.

## Architecture

- **Bootstrap**: `src/main.ts` + `app/app.config.ts` (browser); `src/main.server.ts` + `app/app.config.server.ts` + `app/app.routes.server.ts` (server; every route is `RenderMode.Server`).
- **Routing** (`src/app/app.routes.ts`): every page is a lazy `loadComponent` under `src/app/pages/*` (plus `src/app/program`). The quiz uses `loadChildren` (`quiz-apply.routes.ts`) so its reCAPTCHA providers stay lazy. Category URLs are ambiguous: `:category/:x` is either a subcategory listing or a post. The functional `subcategoryGuard` (`guards/`) resolves this by calling the API (`API_TV_IS_SUBCATEGORY`). If it doesn't match (or the call fails), the route falls through to the single-page (post) route. Route order matters.
- **Services** (`src/app/services`): mostly `httpResource` factories that build URLs from `environment.API_UNA + environment.API_*`. They take signal getters and must be called in an injection context (a page's field initializer), e.g. `inject(TagService).tag(this.tag, this.p)`. `NavService` loads the menu and footer pages once and exposes `nav`, `footerPages` and `quizEnabled` as signals (`quizEnabledGuard` exists but isn't wired to a route).
- **Pages** receive route and query params as `input()`s (`withComponentInputBinding`; the input name must match the param, e.g. `category`, `post`, `p`, `q`). They wrap their resource in `lastValue()` (`utils/resource.ts`), which keeps the previous data while the next request loads. They call `notFoundOnError()` to show the 404 page on API errors and set SEO tags in an `effect()` through `SeoService.set()` (title, description, Open Graph, Twitter, canonical). Pagination: the `p` query param, `pageParam` / `goToPage` from `utils/paging.ts`, and `ngx-pagination`.
- All components are `OnPush` and the app is zoneless: keep view state in signals. Changes made outside template/host listeners and signals (timers, third-party callbacks, reactive-form state changed asynchronously) don't re-render by themselves; call `markForCheck()` (see the quiz). The scroll position is a signal in `WindowScrollService`. Link paths for shows and categories come from `utils/paths.ts`.
- **Shared building blocks** (standalone, imported directly): `components/` (cards), `sections/` (home page sections; `home.component.html` picks the section component from `tv_show_template.type_id` and the data present; carousels are Swiper Element web components set up in `sections/card-carousel.ts`, loaded lazily in the browser only), `directives/` (`run-scripts` executes injected `<script>` tags in API HTML, `viber-share`), `pipes/` (`safe-html`). API models are in `interfaces/`.
- **SSR and hydration**: code touching `window`/`document` must be guarded with `isPlatformBrowser(PLATFORM_ID)`. The client hydrates the server DOM (`provideClientHydration` in `app.config.ts`), so the first client render must produce the same DOM as the server. API HTML that runs third-party scripts (Brid.tv players, Twitter) goes through `components/html-embed` (`ngSkipHydration` + `RunScriptsDirective`); use it rather than `[innerHTML]` + `appRunScripts` directly. The HTTP transfer cache embeds SSR API responses in the page, so on first load the browser makes no API calls. HttpClient uses XHR (`withXhr()`), because the quiz upload needs upload-progress events. AdSense is the auto-ads script in `index.html`.
- **404s**: `NotFoundComponent` sets the HTTP status via `RESPONSE_INIT`. Navigate to it with `router.navigate(['404'], { skipLocationChange: true })`. A URL change during SSR becomes a redirect response with an empty body.
- **Styling**: Tailwind 3.4 (`tailwind.config.js` defines brand colors and the `Unitext` font; `line-clamp-*` is built in) together with per-component SCSS. Templates use `@if`/`@for` control flow. Locale is `sr-Latn-BA`.
