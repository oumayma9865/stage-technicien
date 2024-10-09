import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  editMode: string | null = null;
  editedField: any = {};

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserDetails();
  }

  loadCurrentUserDetails(): void {
    this.currentUser = this.loginService.getUserDetails();
    if (this.currentUser) {
      this.editedField = { ...this.currentUser }; 
    }
  }

  enterEditMode(field: string): void {
    this.editMode = field;
  }

  saveField(field: string): void {
    if (this.currentUser && this.editMode) {
      const updatedUser : User = {
        ...this.currentUser,
        [field]: this.editedField[field]  
      };

      this.userService.updateUserInfo(this.currentUser.id, updatedUser).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.currentUser = response;
          this.editMode = null; 
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }
  

  changePassword(): void {
    if (this.editedField.newPassword === this.editedField.confirmPassword) {
      const updatedPassword = this.editedField.newPassword;
  
      this.userService.updatePassword(this.currentUser.id, updatedPassword).subscribe(
        response => {
          console.log('Password changed successfully', response);
          Swal.fire('Succès', 'Mot de passe mis à jour avec succès.', 'success');
          this.editedField.newPassword = '';
          this.editedField.confirmPassword = '';
          this.editMode = null;
        },
        error => {
          console.error('Error changing password', error);
          Swal.fire('Erreur', 'Erreur lors de la mise à jour du mot de passe.', 'error');
        }
      );
    } else {
      console.error('Passwords do not match');
      Swal.fire('Erreur', 'Les mots de passe ne correspondent pas.', 'error');
    }
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('cv', file);
  
      this.userService.updateUserInfo(this.currentUser.id, this.currentUser, file).subscribe(
        (updatedUser) => {
          this.currentUser = updatedUser;
          Swal.fire('Success', 'CV updated successfully', 'success');
        },
        (error) => {
          console.error('Error updating CV:', error);
          Swal.fire('Error', 'Error updating CV', 'error');
        }
      );
    }
  }
  
  getCVUrl(cv: string): SafeUrl {
    if (cv) {
      const byteCharacters = atob(cv);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' }); // Assurez-vous que le type MIME est correct
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }
    return '';
  }


  goHome(): void {
    this.router.navigate(['/home-candidat']);
  }
  togglePasswordVisibility(fieldId: string): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field.type === 'password') {
      field.type = 'text';
    } else {
      field.type = 'password';
    }
  }
}
