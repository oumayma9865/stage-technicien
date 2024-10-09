import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptor } from './services/auth.interceptor'; // Assurez-vous que le chemin est correct

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    BrowserAnimationsModule
  ]
};
