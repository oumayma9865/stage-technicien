import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink,RouterLinkActive} from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebaradminComponent {

  
  constructor(private loginService: LoginService, private router: Router) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/auth']); // Redirige vers la page d'authentification
  }


}
