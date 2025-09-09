import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = Number(localStorage.getItem('role'));

  // If no token, redirect to login
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Roles from route data
  const allowedRoles = route.data?.['roles'] as number[];

  // Check if role is permitted
  if (allowedRoles && !allowedRoles.includes(role)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
