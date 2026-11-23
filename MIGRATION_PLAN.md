# Migration plan: Angular 14 → Angular 22 (modern SSR + signals)

Target: **Angular 22.3** (current on npm as of 2026-11-23), with standalone components, the application builder, `@angular/ssr` with hydration, signals and zoneless change detection.

Starting point: Angular 14.2, 123 TS files, NgModules throughout, `@nguniversal/express-engine`, 8 site configurations (`unabih`, `unasr`, `unahr`, `unaen` and their `...prod` variants), about 90 `*ngIf`/`*ngFor` uses.

## Things in this codebase that shape the plan

1. **`ng update` only moves one major version at a time.** That's 8 steps (15 → 22). Older CLIs (v15–v18) won't run on Node 26, so use `nvm` for the intermediate steps (Node 18, then 20, then 22).
2. **Third-party packages that will block upgrades:**

   | Package | Problem | Action |
   |---|---|---|
   | `swiper` 8 + `swiper/angular` (2 sections) | The Angular wrapper was removed in Swiper 9 | Switch to Swiper Element (`swiper/element`) with `CUSTOM_ELEMENTS_SCHEMA`, registered in the browser only |
   | `ng-recaptcha` 10 (quiz) | No longer maintained | Replace with `ng-recaptcha-2` |
   | `ngx-sharebuttons` 11 (single page) | API changed in v15+ | Upgrade and update the template |
   | `ng2-adsense`, `ngx-pagination` | Old major versions | Bump at each step |
   | `ngx-google-analytics`, `mongojs`, `json-server`, `concurrently` | Not used in `src/` | Remove |
   | `@tailwindcss/line-clamp` | Built into Tailwind since 3.3 | Remove the plugin |

3. **The current SSR fetches everything twice.** The server calls the API, then the browser bootstraps and calls it again, because there's no TransferState. Hydration's HTTP transfer cache fixes this for free, and it's the biggest practical gain from the migration.
4. **Spots that will break hydration if left alone:**
   - `RunScriptsDirective`, which re-inserts `<script>` tags for Brid and Twitter
   - `[innerHTML]` content from the API
   - AdSense blocks
   - `main.ts` waiting for `DOMContentLoaded`
   - `document.location.href` used for canonical/og URLs during SSR (probably wrong on the server today)
5. **`CanMatchService` has a bug.** It returns a shared `Subject` and subscribes as a side effect, so two quick navigations can race. Rewrite it as a functional `canMatch` that returns `getCategoryTest(...).pipe(map(...))`.
6. **The deploy layout will change.** The new builder outputs `dist/<site>/browser` and `dist/<site>/server/server.mjs` instead of `dist/server/main.js`. `APP_SERVER_DIST_FOLDER`, the `serve:ssr` script and the server deploy scripts must be updated together.

## Phase 0: Safety net (about half a day)

- Work on a `feat/angular-22` branch.
- Add the missing `production` configuration (or set `defaultConfiguration`) in `angular.json`.
- **Take an SSR baseline.** Write a script that builds each site, starts SSR, runs `curl` on about 10 representative routes, and saves the HTML:
  - home
  - parent category, subcategory and post
  - `:category/:post`
  - `nasa-lica` and a single personality
  - `program`, `pretraga?q=`, `p/:static`, `tag/:tag`
  - `una-kviz`, 404

  Afterwards, compare `<title>`, meta/og tags, canonical URL and main content. This is the regression check after every phase.
- Write down the exact production deploy steps for each country.

## Phase 1: Step up versions, keeping NgModules and webpack (v14 → v17)

For each step: run `ng update @angular/core@N @angular/cli@N`, accept the migrations, bump third-party packages, build all sites, and compare against the baseline.

- **v15:** `polyfills.ts` becomes `["zone.js"]` in `angular.json`; `test.ts` is simplified.
- **v16:** Ship the Swiper Element replacement. Turn `CanMatchService` and `QuizEnabledGuard` into functional guards.
- **v17:** `ng update` moves `@nguniversal/*` to `@angular/ssr` and rewrites `server.ts` to use `CommonEngine`. Keep the webpack builder for now so this step changes only one thing.

## Phase 2: v18 → v22, then standalone

- Step up through 18, 19, 20, 21 and 22, moving Node up as you go. Swap `ng-recaptcha` and upgrade `ngx-sharebuttons` at whichever version they stop being compatible.
- Run `ng g @angular/core:standalone` in its three modes: convert components, remove modules, bootstrap with `bootstrapApplication`. This produces `app.config.ts` with:
  - `provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }), withComponentInputBinding())`
  - `provideHttpClient(withFetch())`
  - `LOCALE_ID`
  - the AdSense providers
- Lazy routes change from `loadChildren` modules to `loadComponent`. Route order and the `canMatch` fallthrough stay exactly as they are.
- Run `ng g @angular/core:inject` to replace constructor injection.

## Phase 3: Modern SSR, hydration and the application builder

- Run `ng update`'s `use-application-builder` migration (esbuild/Vite). Move each `outputPath` into its site configuration; `fileReplacements` keep working.
- **Server rendering:**
  - Rewrite `server.ts` to use `AngularNodeAppEngine` plus `createNodeRequestHandler`, reading `APP_PORT` from the environment.
  - Add `app.config.server.ts` and `app.routes.server.ts` with `RenderMode.Server` for the dynamic routes (almost all of them) and `RenderMode.Prerender` for `404`, plus static pages if wanted.
  - **Return a real 404 status.** Today the app navigates to `404` and sends HTTP 200. Set the status through `RESPONSE_INIT` on the not-found route and on API errors.
  - Build canonical and og URLs from `REQUEST`, or from a configured site origin, instead of `document.location`.
- **Hydration:**
  - Add `provideClientHydration(withEventReplay(), withIncrementalHydration(), withHttpTransferCacheOptions(...))`.
  - Put `ngSkipHydration` on hosts that touch raw HTML or scripts (`appRunScripts` containers, ad slots). Wrap below-the-fold sections, ads and the Brid player in `@defer (on viewport; hydrate on viewport)`.
  - Remove the `DOMContentLoaded` wrapper in `main.ts`.
- Update `package.json` scripts, the `serve:ssr` path and the deploy scripts to the new output layout.

## Phase 4: Templates and signals

1. **Control flow:** run `ng g @angular/core:control-flow` (`@if`/`@for` with `track`), then the self-closing-tags migration.
2. **Signal APIs:** run `signal-input-migration`, `output-migration` and `signal-queries-migration` (about 12 `@Input`s, 1 `@Output`, 1 `@ViewChild`). Replace the `ngOnChanges` in `card-small-content-down` and `home-hero-section-full` with `computed()`.
3. **Services:**
   - `NavService`: replace the `Subject`/`BehaviorSubject` + `subscribe` pattern with `httpResource`, or signals with `computed()` for the slug mapping (pull the duplicated slug logic into one function).
   - `quizEnabled` becomes a `computed()`; the guard uses `toObservable()` or a resource status.
   - Same treatment for `SearchService.searchRes$` and the site-select state.
4. **Pages:**
   - Route params arrive as `input()` through `withComponentInputBinding()`.
   - Data loads through `httpResource(() => url(category(), post()))`, which works with the SSR transfer cache.
   - SEO tags are set in an `effect()` or a shared `SeoService.set(post)`, removing the copy-pasted meta blocks.
   - The two identical `subscribe` branches in `SinglePageComponent` collapse into one.
   - `@HostListener('window:scroll')` moves to a browser-only `afterNextRender`, or a signal fed by a passive listener.
5. Turn on `OnPush` everywhere as components are converted.

## Phase 5: Zoneless, testing and cleanup

- Switch to `provideZonelessChangeDetection()` and remove `zone.js`. Check `ngx-pagination`, AdSense, Swiper events and the `setTimeout` calls in `RunScriptsDirective`, which may need `ChangeDetectorRef` or signals.
- Karma is deprecated; move to Vitest (default since v21) using the jasmine→vitest refactor schematic. Most specs are default "should create" stubs, so regenerating them is fine.
- Optional and separate: Tailwind 4 (CSS-first config). Keep it out of this migration.

## Order and risk

- Phases 0–1 are low risk; the stack still works the same way.
- **Phase 3 carries the most risk:** deploy, hydration and the Brid/AdSense scripts can break. Test on one staging site (`unasr`) before the others.
- Phases 4–5 can be done one page at a time in separate PRs.
- Each phase ends with all 8 site configurations building, SSR passing the baseline comparison, and a separate commit or PR.
