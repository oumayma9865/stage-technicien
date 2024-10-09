import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ResetPasswordResponse, UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  message: string | null = null;
  messageType: 'error' | 'success' | null = null;

  constructor(private userService: UserService, private router: Router) {}

  // Méthode pour soumettre le formulaire
  Submit(): void {
    if (this.email) {
      this.userService.resetPassword(this.email).subscribe(
        (response: ResetPasswordResponse) => {
          
          this.message = 'Votre mot de passe a été réinitialisé avec succès. Veuillez vérifier votre boîte de réception.';
          this.messageType = 'success';
          this.email='';
          setTimeout(() => {
            this.router.navigate(['/auth']);
            
          }, 2000);
          
        },
        error => {
          console.error('Erreur lors de la réinitialisation du mot de passe:', error);
          this.message = 'Erreur lors de la réinitialisation du mot de passe.';
          this.messageType = 'error';
        }
      );
    } else {
      this.message = 'Veuillez entrer une adresse e-mail valide.';
      this.messageType = 'error';
    }
  }
  
}