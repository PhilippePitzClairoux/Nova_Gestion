import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthentificationService } from './../services/authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthentificationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    // return true; // Allow you to bypass the authGuard
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/authentification']);
    return false;
  }
}
