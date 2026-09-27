import { Routes } from '@angular/router';
import { AuthorsList } from './components/authors-list/authors-list';
import { AuthorsCrear } from './components/authors-crear/authors-crear';
import { BooksList } from './components/books-list/books-list';
import { BooksCrear } from './components/books-crear/books-crear';

export const routes: Routes = [
  { path: 'authors', component: AuthorsList },
  { path: 'authors/new', component: AuthorsCrear },
  { path: 'authors/:id/edit', component: AuthorsCrear },
  { path: 'books', component: BooksList },
  { path: 'books/new', component: BooksCrear },
  { path: 'books/:id/edit', component: BooksCrear },
];