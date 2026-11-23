# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

UNA TV portal: an **Angular 22** site with standalone components (no NgModules) and SSR through `@angular/ssr`'s `CommonEngine` (`server.ts`, Express). Content (TV shows, categories, personalities, TV program, static pages, quiz applications) comes from the external UNA REST API; there is no backend in this repo. UI text and route slugs are in Serbian/Bosnian (`pretraga`, `nasa-lica`, `una-kviz`, `p/:static`).

A migration is in progress (see `MIGRATION_PLAN.md`; phases 1–2 are done on `feat/angular-22`). The app still uses zone.js, Eager change detection on every component, RxJS state, decorator `@Input`s, the webpack `browser`/`server` builders and no hydration. Those are later phases, so don't mix them into unrelated changes. Requires Node ≥22.22 (`nvm use 24`). TypeScript 6.

## Commands

- `npm start`: dev server (`ng serve`, development config, http://localhost:4200)
- `npm run dev:ssr`: dev server with SSR
- `npm test`: Karma/Jasmine unit tests in Chrome. Several generated "should create" specs don't compile, so the whole suite fails to build. To run specific specs, point `--ts-config` at a temporary tsconfig that extends `tsconfig.spec.json` and includes only those files, plus `--include <dir>`.
- Per-site builds: `ng build --configuration=<site>` and `ng run unatvbih:server:<site>`, where `<site>` is one of `unabih`, `unasr`, `unahr`, `unaen` (test/staging) or the `...prod` variant. npm shortcuts exist only for Serbia: `npm run build:ssrsrb` / `npm run build:ssrsrbprod`.
- `npm run serve:ssr`: runs `dist/server/main.js`

There is no lint setup. Formatting uses Prettier with `singleQuote: true`.

Gotchas:
- The `build`/`server` targets default to a `production` configuration that is not defined in `angular.json`. Always pass an explicit `--configuration`.
- SSR only renders for hosts in `ALLOWED_HOSTS` in `server.ts` (or the `NG_ALLOWED_HOSTS` env var). Any other `Host` header silently falls back to client-side rendering.
- Only `unasr`/`unasrprod` build. The other site environments lack TV-only keys (`API_TV_IS_SUBCATEGORY`, `API_PERSONALITIES`, `API_TV_PROGRAM`, ...).

## Multi-site setup via environments

One codebase serves several country sites. Each site has its own `src/environments/environment.<site>[prod].ts`, which is swapped in through `fileReplacements` in `angular.json`. Each build writes to a different output folder: `ba/`, `dist/` (sr), `hr/`, `en/`, each with a `/server` subfolder.

The environment object holds everything that differs between sites:
- `API_UNA` base URL plus endpoint paths (`API_POST`, `API_HOME`, ...). Endpoint paths **differ between sites**: the sr/tv environments use `/tv/...` paths, while some others (e.g. `unabihprod`) use `/articles/...`, `/categories/...` and lack TV-only keys such as `API_PERSONALITIES` and `API_TV_PROGRAM`.
- `APP_PORT`, `APP_SERVER_DIST_FOLDER` (used by `server.ts`), `APP_FOLDER`, language/locale strings, SEO meta defaults, the reCAPTCHA key, and `SITE_SELECT` (the country switcher in the header).

When adding a new API endpoint or config value, add it to **every** environment file, or the builds for the other sites will break.

## Architecture

- **Bootstrap**: `src/main.ts` + `app/app.config.ts` (browser); `src/main.server.ts` + `app/app.config.server.ts` (server, default-exported `bootstrap(context)` used by `server.ts`).
- **Routing** (`src/app/app.routes.ts`): every page is a lazy `loadComponent` under `src/app/pages/*` (plus `src/app/program`). The quiz uses `loadChildren` (`quiz-apply.routes.ts`) so its reCAPTCHA providers stay lazy. Category URLs are ambiguous: `:category/:x` is either a subcategory listing or a post. The functional `subcategoryGuard` (`guards/`) resolves this by calling the API (`API_TV_IS_SUBCATEGORY`). If it doesn't match (or the call fails), the route falls through to the single-page (post) route. Route order matters.
- **Services** (`src/app/services`): thin `HttpClient` wrappers that build URLs from `environment.API_UNA + environment.API_*`. Shared state uses BehaviorSubject/Subject observables. For example, `NavService` loads the menu and exposes `quizEnabled$`, which the quiz page reads (`quizEnabledGuard` exists but isn't wired to a route).
- **Pages** use `inject()` and subscribe in their constructors via `ActivatedRoute.paramMap`, fetch data, set SEO tags with `Meta`/`Title`, and navigate to `404` on API errors. Pagination uses the `p` query param with `ngx-pagination`.
- **Shared building blocks** (standalone, imported directly): `components/` (cards), `sections/` (home page sections; `home.component.html` picks the section component from `tv_show_template.type_id` and the data present; carousels are Swiper Element web components set up in `sections/card-carousel.ts`, loaded lazily in the browser only), `directives/` (`run-scripts` executes injected `<script>` tags in API HTML, `viber-share`), `pipes/` (`safe-html`). API models are in `interfaces/`.
- **SSR**: code touching `window`/`document` must be guarded with `isPlatformBrowser(PLATFORM_ID)`. Video embeds (Brid.tv) are injected as raw HTML/scripts; AdSense is the auto-ads script in `index.html`.
- **Styling**: Tailwind 3.4 (`tailwind.config.js` defines brand colors and the `Unitext` font; `line-clamp-*` is built in) together with per-component SCSS. Templates use `@if`/`@for` control flow. Locale is `sr-Latn-BA`.
