import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app.routes';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  onStartClick() {
    this.router.navigate(['/auth']);
  }
}
