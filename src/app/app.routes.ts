import { Routes } from '@angular/router';
import { BookResolver } from './features/library/resolvers/BookResolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'library',
    pathMatch: 'full',
  },
  {
    path: 'library',
    loadComponent: () =>
      import(
        './features/library/views/book-list-component/book-list-component'
      ).then((m) => m.BookListComponent),
  },
  {
    path: 'library/new',
    loadComponent: () =>
      import(
        './features/library/views/book-detail-component/book-detail-component'
      ).then((m) => m.BookDetailComponent),
  },
  {
    path: 'library/:id',
    loadComponent: () =>
      import(
        './features/library/views/book-detail-component/book-detail-component'
      ).then((m) => m.BookDetailComponent),
    resolve: {
      book: BookResolver,
    },
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./core/views/error-view/error-view').then((m) => m.ErrorView),
  },
  { path: '**', redirectTo: 'error' },
];
