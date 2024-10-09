import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = loginService.getToken();
  console.log('Token in interceptor:', token); // Vérifiez si le token est affiché correctement

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) { // Jeton expiré ou non autorisé
        console.log('Jeton expiré ou non autorisé, redirection vers la page d\'authentification');
        loginService.logout(); // Déconnecter l'utilisateur
        router.navigate(['/auth']); // Rediriger vers la page d'authentification
      }
      return throwError(() => error); // Propager l'erreur pour traitement ultérieur si nécessaire
    })
  );
};
