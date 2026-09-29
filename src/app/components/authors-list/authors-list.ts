import { Component, OnInit, computed, inject, signal } from '@angular/core';
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
paginaActual = signal(1);
  porPagina = 5;

  
  totalPaginas = computed(() =>
    Math.ceil(this.authors().length / this.porPagina)
  );

  authorsPagina = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.porPagina;
    return this.authors().slice(inicio, inicio + this.porPagina);
  });

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
        
        this.authors.update(lista => lista.filter(a => a._id !== id));
      },
      error: (err) => {
        console.error('Error borrando autor', err);
      }
    });
  }

   paginaAnterior(): void {
    if (this.paginaActual() > 1) {
      this.paginaActual.update(p => p - 1);
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.update(p => p + 1);
    }
  }
}