import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-books-crear',
  imports: [ReactiveFormsModule],
  templateUrl: './books-crear.html',
  styleUrl: './books-crear.css',
})
export class BooksCrear implements OnInit {
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  bookId: string | null = null;

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    isbn: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    edition: new FormControl(1, { nonNullable: true, validators: [Validators.required] }),
    publisher: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    publishedYear: new FormControl(2024, { nonNullable: true, validators: [Validators.required] }),
    pages: new FormControl(100, { nonNullable: true, validators: [Validators.required] }),
    language: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    authorName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    authorEmail: new FormControl('', { nonNullable: true }),
    authorPassword: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe({
        next: (response) => {
          this.form.patchValue({
            title: response.book.title,
            isbn: response.book.isbn,
            edition: response.book.edition,
            publisher: response.book.publisher,
            publishedYear: response.book.publishedYear,
            pages: response.book.pages,
            language: response.book.language,
            price: response.book.price,
          });
        },
        error: (err) => console.error('Error cargando libro', err),
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      return;
    }

    const raw = this.form.getRawValue();

    // Buscamos si ya existe un autor con ese nombre
    this.authorService.getAuthors().subscribe({
      next: (response) => {
        const autorEncontrado = response.authors.find(
          a => a.name.toLowerCase().trim() === raw.authorName.toLowerCase().trim()
        );

        if (autorEncontrado) {
          // Ya existe: usamos directamente su _id
          this.guardarLibro(raw, autorEncontrado._id);
        } else {
          // No existe: lo creamos primero con los datos del formulario
          this.authorService.createAuthor({
            name: raw.authorName,
            email: raw.authorEmail,
            password: raw.authorPassword,
          } as any).subscribe({
            next: (authorResponse) => {
              this.guardarLibro(raw, authorResponse.author._id);
            },
            error: (err) => console.error('Error creando autor nuevo', err),
          });
        }
      },
      error: (err) => console.error('Error buscando autores', err),
    });
  }

  private guardarLibro(raw: any, authorId: string): void {
    const bookData = {
      title: raw.title,
      isbn: raw.isbn,
      edition: raw.edition,
      publisher: raw.publisher,
      publishedYear: raw.publishedYear,
      pages: raw.pages,
      language: raw.language,
      price: raw.price,
      authors: [authorId],
    };

    if (this.bookId) {
      this.bookService.updateBook(this.bookId, bookData as any).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Error actualizando libro', err),
      });
    } else {
      this.bookService.createBook(bookData as any).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Error creando libro', err),
      });
    }
  }
}