import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors-crear',
  imports: [ReactiveFormsModule],
  templateUrl: './authors-crear.html',
  styleUrl: './authors-crear.css',
})
export class AuthorsCrear implements OnInit {
  private authorService = inject(AuthorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  authorId: string | null = null; 

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    nationality: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    
    this.authorId = this.route.snapshot.paramMap.get('id');

    if (this.authorId) {
      
      this.authorService.getAuthor(this.authorId).subscribe({
        next: (response) => {
          this.form.patchValue({
            name: response.author.name,
            email: response.author.email,
            nationality: response.author.nationality,
          });
          
          this.form.controls.password.clearValidators();
          this.form.controls.password.updateValueAndValidity();
        },
        error: (err) => console.error('Error cargando autor', err),
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.authorId) {

      const data = this.form.getRawValue();
      if (!data.password) {
        delete (data as Partial<typeof data>).password;
      }

      this.authorService.updateAuthor(this.authorId, data).subscribe({
        next: () => this.router.navigate(['/authors']),
        error: (err) => console.error('Error actualizando autor', err),
      });
    } else {
      this.authorService.createAuthor(this.form.getRawValue()).subscribe({
        next: () => this.router.navigate(['/authors']),
        error: (err) => console.error('Error creando autor', err),
      });
    }
  }
}