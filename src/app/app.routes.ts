import { Routes } from '@angular/router';
import { AuthorsList } from './components/authors-list/authors-list';
import { AuthorsCrear } from './components/authors-crear/authors-crear';

export const routes: Routes = [
  { path: 'authors', component: AuthorsList },
  { path: 'authors/new', component: AuthorsCrear },
  { path: 'authors/:id/edit', component: AuthorsCrear },
];