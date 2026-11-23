# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

UNA TV portal: an **Angular 14** (NgModule-based, not standalone) site with Angular Universal SSR (`server.ts`, Express). Content (TV shows, categories, personalities, TV program, static pages, quiz applications) comes from the external UNA REST API; there is no backend in this repo. UI text and route slugs are in Serbian/Bosnian (`pretraga`, `nasa-lica`, `una-kviz`, `p/:static`).

Note: the bundled `angular-developer` skill targets modern Angular (signals, standalone, control flow). This project is on v14 with TypeScript 4.8, so follow the existing NgModule + RxJS patterns rather than introducing newer APIs.

## Commands

- `npm start`: dev server (`ng serve`, development config, http://localhost:4200)
- `npm run dev:ssr`: dev server with SSR
- `npm test`: Karma/Jasmine unit tests in Chrome. For a single spec: `npx ng test --include src/app/path/to/file.spec.ts` (or temporarily use `fdescribe`/`fit`)
- Per-site builds: `ng build --configuration=<site>` and `ng run unatvbih:server:<site>`, where `<site>` is one of `unabih`, `unasr`, `unahr`, `unaen` (test/staging) or the `...prod` variant. npm shortcuts exist only for Serbia: `npm run build:ssrsrb` / `npm run build:ssrsrbprod`.
- `npm run serve:ssr`: runs `dist/server/main.js`

There is no lint setup. Formatting uses Prettier with `singleQuote: true`.

Gotchas:
- The `build`/`server` targets default to a `production` configuration that is not defined in `angular.json`. Always pass an explicit `--configuration`.
- `npm run serve:json` points at `server/db.json`, which does not exist.

## Multi-site setup via environments

One codebase serves several country sites. Each site has its own `src/environments/environment.<site>[prod].ts`, which is swapped in through `fileReplacements` in `angular.json`. Each build writes to a different output folder: `ba/`, `dist/` (sr), `hr/`, `en/`, each with a `/server` subfolder.

The environment object holds everything that differs between sites:
- `API_UNA` base URL plus endpoint paths (`API_POST`, `API_HOME`, ...). Endpoint paths **differ between sites**: the sr/tv environments use `/tv/...` paths, while some others (e.g. `unabihprod`) use `/articles/...`, `/categories/...` and lack TV-only keys such as `API_PERSONALITIES` and `API_TV_PROGRAM`.
- `APP_PORT`, `APP_SERVER_DIST_FOLDER` (used by `server.ts`), `APP_FOLDER`, language/locale strings, SEO meta defaults, the reCAPTCHA key, and `SITE_SELECT` (the country switcher in the header).

When adding a new API endpoint or config value, add it to **every** environment file, or the builds for the other sites will break.

## Architecture

- **Routing** (`src/app/app-routing.module.ts`): every page is a lazy-loaded module under `src/app/pages/*` (plus `src/app/program`). Category URLs are ambiguous: `:category/:x` is either a subcategory listing or a post. `CanMatchService` resolves this by calling the API (`API_TV_IS_SUBCATEGORY`). If it doesn't match, the route falls through to the single-page (post) route. Route order matters.
- **Services** (`src/app/services`): thin `HttpClient` wrappers that build URLs from `environment.API_UNA + environment.API_*`. Shared state uses BehaviorSubject/Subject observables. For example, `NavService` loads the menu and exposes `quizEnabled$`, which the quiz page and `QuizEnabledGuard` read.
- **Pages** subscribe in their constructors via `ActivatedRoute.paramMap`, fetch data, set SEO tags with `Meta`/`Title`, and navigate to `404` on API errors. Pagination uses the `p` query param with `ngx-pagination`.
- **Shared modules**: `components/` (cards), `sections/` (home page sections; `home.component.html` picks the section component from `tv_show_template.type_id` and the data present), `directives/` (`run-scripts` executes injected `<script>` tags in API HTML, `viber-share`), `pipes/` (`safe-html`). API models are in `interfaces/`.
- **SSR**: code touching `window`/`document` must be guarded with `isPlatformBrowser(PLATFORM_ID)`. Video embeds (Brid.tv) and ads (`ng2-adsense`) are injected as raw HTML/scripts.
- **Styling**: Tailwind 3 (`tailwind.config.js` defines brand colors and the `Unitext` font, plus the line-clamp plugin) together with per-component SCSS. Locale is `sr-Latn-BA`.
