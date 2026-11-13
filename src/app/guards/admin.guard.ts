import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// Solo el administrador entra. Un cliente vuelve al catálogo.
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.usuario()?.rol === 'admin' ? true : inject(Router).createUrlTree(['/catalogo']);
};
