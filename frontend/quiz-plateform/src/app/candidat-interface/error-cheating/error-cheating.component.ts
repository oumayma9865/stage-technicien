import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-cheating',
  standalone: true,
  imports: [],
  templateUrl: './error-cheating.component.html',
  styleUrl: './error-cheating.component.css'
})
export class ErrorCheatingComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 6000); 
  }
 
}
