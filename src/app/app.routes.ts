import { Routes } from '@angular/router';
import { subcategoryGuard } from './guards/subcategory.guard';

const loadNotFound = () =>
  import('./pages/not-found/not-found.component').then(
    (m) => m.NotFoundComponent,
  );

const loadSinglePage = () =>
  import('./pages/single-page/single-page.component').then(
    (m) => m.SinglePageComponent,
  );

// Order matters: `:category/:subcategory` is tried first and only matches when
// the API says the segment is a subcategory; otherwise it falls through to the
// post route `:category/:post`.
export const routes: Routes = [
  {
    path: '404',
    loadComponent: loadNotFound,
  },
  {
    path: 'pretraga',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'program',
    loadComponent: () =>
      import('./program/program.component').then((m) => m.ProgramComponent),
  },
  {
    path: 'nasa-lica',
    loadComponent: () =>
      import('./pages/personality-list/personality-list.component').then(
        (m) => m.PersonalityListComponent,
      ),
  },
  {
    path: 'una-kviz',
    // Lazy child routes so the reCAPTCHA providers stay in the quiz chunk.
    loadChildren: () =>
      import('./pages/quiz-apply/quiz-apply.routes').then(
        (m) => m.QUIZ_APPLY_ROUTES,
      ),
  },
  {
    path: 'nasa-lica/:personality',
    loadComponent: () =>
      import('./pages/personality-single/personality-single.component').then(
        (m) => m.PersonalitySingleComponent,
      ),
  },
  {
    path: 'p/:static',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/static/static.component').then((m) => m.StaticComponent),
  },
  {
    path: 'tag/:tag',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/tag/tag.component').then((m) => m.TagComponent),
  },
  {
    path: ':category',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/parent-category/parent-category.component').then(
        (m) => m.ParentCategoryComponent,
      ),
  },
  {
    path: ':category/:subcategory',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/category-list/category-list.component').then(
        (m) => m.CategoryListComponent,
      ),
    canMatch: [subcategoryGuard],
  },
  {
    path: ':category/:post',
    loadComponent: loadSinglePage,
  },
  {
    path: ':category/:subcategory/:post',
    pathMatch: 'full',
    loadComponent: loadSinglePage,
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    loadComponent: loadNotFound,
  },
];
