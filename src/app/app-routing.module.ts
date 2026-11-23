import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { subcategoryGuard } from './guards/subcategory.guard';

const routes: Routes = [
  {
    path: '404',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'pretraga',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'program',
    loadChildren: () =>
      import('./program/program.module').then((m) => m.ProgramModule),
  },
  {
    path: 'nasa-lica',
    loadChildren: () =>
      import('./pages/personality-list/personality-list.module').then(
        (m) => m.PersonalityListModule
      ),
  },
  {
    path: 'una-kviz',
    loadChildren: () =>
      import('./pages/quiz-apply/quiz-apply.module').then(
        (m) => m.QuizApplyModule
      ),
  },
  {
    path: 'nasa-lica/:personality',
    loadChildren: () =>
      import('./pages/personality-single/personality-single.module').then(
        (m) => m.PersonalitySingleModule
      ),
  },
  {
    path: 'p/:static',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/static/static.module').then((m) => m.StaticModule),
  },
  {
    path: 'tag/:tag',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/tag/tag.module').then((m) => m.TagModule),
  },
  {
    path: ':category',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/parent-category/parent-category.module').then(
        (m) => m.ParentCategoryModule
      ),
  },
  {
    path: ':category/:subcategory',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/category-list/category-list.module').then(
        (m) => m.CategoryListModule
      ),
    canMatch: [subcategoryGuard],
  },
  {
    path: ':category/:post',
    loadChildren: () =>
      import('./pages/single-page/single-page.module').then(
        (m) => m.SinglePageModule
      ),
  },
  {
    path: ':category/:subcategory/:post',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/single-page/single-page.module').then(
        (m) => m.SinglePageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
