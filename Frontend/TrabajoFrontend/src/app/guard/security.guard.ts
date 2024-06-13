import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';

export const segGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);
  const rpta = lService.verificar();
  if (!rpta) {
    router.navigate(['login']);
    return false;
  }
  return rpta;
};