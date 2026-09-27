import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../models';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-list',
  imports: [RouterLink],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css',
})
export class BooksList implements OnInit {
  private bookService = inject(BookService);
  books = signal<Book[]>([]);

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.books.set(response.books);
      },
      error: (err) => console.error('Error cargando libros', err),
    });
  }

  borrarLibro(id: string): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books.update(lista => lista.filter(b => b._id !== id));
      },
      error: (err) => console.error('Error borrando libro', err),
    });
  }
}