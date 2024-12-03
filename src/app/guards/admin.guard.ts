import { inject } from '@angular/core';
import {  CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.getProfile().pipe(
    map(profile => {
      if (profile.roles.includes('ROLE_ADMIN')) {
        return true; 
      } else {
        return false; 
      }
    }),
    catchError(err => {
      return of(false);
    })
  );

  
  
};
