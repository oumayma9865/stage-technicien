import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  user: User={id: 0 , username:'',email:'', phone: 0 ,password:'',role: { id: 2, rolename: 'User' },locked:false, enabled:true, cv: '' };
  userData: any = { username: '', password: '' };
  cvFile: File | null = null;
  confirmPassword: string = '';

  ngOnInit(): void {
    $(document).ready(function () {
      $("#sign-in-btn").click(function () {
        $(".containerr").removeClass("sign-up-mode");
      });

      $("#sign-up-btn").click(function () {
        $(".containerr").addClass("sign-up-mode");
      });
    });

    if (this.loginService.IsloggedIn()) {
      if (this.loginService.getUserAuthority() === 'Admin') {
        this.router.navigate(['adminhome']);
      } else if (this.loginService.getUserAuthority() === 'User') {
        this.router.navigate(['home-candidat']);
      } else {
        this.loginService.logout();
      }
    }
  }
  togglePasswordVisibility(fieldId: string): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field.type === 'password') {
      field.type = 'text';
    } else {
      field.type = 'password';
    }
  }

  login() {
    if (!this.userData.username) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Nom d'utilisateur invalide, veuillez essayer avec un nom d'utilisateur valide",
      });
      return;
    }
    if (!this.userData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Mot de passe invalide, veuillez essayer avec un mot de passe valide",
      });
      return;
    }
    this.generateToken();
  }

  generateToken() {
    this.loginService.login(this.userData).subscribe(
      (data: any) => {
        // Assurez-vous que le token est enregistré
        this.loginService.loginUser(JSON.parse(JSON.stringify(data)).token);
  
        // Obtenez les détails de l'utilisateur actuel
        this.loginService.getCurrentUser().subscribe(
          (userData: any) => {
            // Vérifiez si l'utilisateur est bloqué
            if (userData.locked) {
              Swal.fire({
                icon: 'error',
                title: 'Compte bloqué',
                text: 'Votre compte est bloqué. Veuillez contacter l\'administrateur.',
              });
              this.loginService.logout();
            } else {
              this.loginService.setUserDetails(userData);
              if (this.loginService.getUserAuthority() === 'Admin') {
                this.router.navigate(['adminhome']);
                this.loginService.loginStatusSubject.next(true);
               
              } else if (this.loginService.getUserAuthority() === 'User') {
                this.router.navigate(['home-candidat']);
                this.loginService.loginStatusSubject.next(true);
                
              } else {
                this.loginService.logout();
              }
            }
          },
          () => Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Aucun utilisateur actuellement connecté",
          })
        );
      },
      () => Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Détails invalides ! Veuillez réessayer avec des informations valides",
      })
    );
  }
  

  formSubmit(): void {
    if (!this.user.username) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Le nom d'utilisateur est requis !!",
      });
      return;
    }
    if (!this.user.email || !this.user.password || !this.user.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Tous les champs sont requis !!",
      });
      return;
    }
    if (this.user.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Les mots de passe ne correspondent pas !!",
      });
      return;
    }
  
    if (this.cvFile) {
      this.userService.registerUser(this.user, this.cvFile).subscribe(
        () => {
          Swal.fire('Succès', "L'utilisateur a été enregistré avec succès", 'success');
          this.resetForm();
        },
        () => Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Quelque chose a mal tourné !! Veuillez réessayer...",
        })
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Veuillez télécharger votre CV !!",
      });
    }
  }
  

  resetForm(): void {
    this.user = {
      id: 0,
      username: '',
      email: '',
      phone: 0,
      password: '',
      role: { id: 2, rolename: 'User' },
      locked: false,
      enabled: true,
      cv: ''
    };
    this.confirmPassword = '';
    this.cvFile = null; // Réinitialiser le fichier CV
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.cvFile = file; // Stocker le fichier CV
  }
 
}
