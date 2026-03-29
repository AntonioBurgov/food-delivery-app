import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (requiredRole: string) => () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();
  if (user && user.role === requiredRole) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
