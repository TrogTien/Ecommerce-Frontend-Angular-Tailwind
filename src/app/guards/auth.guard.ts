import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  
  return authService.isLoggedIn$.pipe(
    map(val => {
      console.log("isLoggedIn = ", val)
      return val;
    })
  )
  
};
