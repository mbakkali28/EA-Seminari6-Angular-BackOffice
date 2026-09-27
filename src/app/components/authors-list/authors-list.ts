import { Component, OnInit, inject, signal } from '@angular/core';
import { Author } from '../../models';
import { AuthorService } from '../../services/author.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors-list',
  imports: [RouterLink],
  templateUrl: './authors-list.html',
  styleUrl: './authors-list.css',
})
export class AuthorsList implements OnInit {
  private authorService = inject(AuthorService);

  authors = signal<Author[]>([]);

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe({
      next: (response) => {
        this.authors.set(response.authors);
      },
      error: (err) => {
        console.error('Error cargando autores', err);
      }
    });
  }
  borrarAutor(id: string): void {
    this.authorService.deleteAuthor(id).subscribe({
      next: () => {
        // Quitamos el autor borrado de la lista, sin volver a pedir todo a la API
        this.authors.update(lista => lista.filter(a => a._id !== id));
      },
      error: (err) => {
        console.error('Error borrando autor', err);
      }
    });
  }
}