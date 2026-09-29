import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Barradenavegacion } from './components/barradenavegacion/barradenavegacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Barradenavegacion],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('backoffice');
}
