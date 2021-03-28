import {Router} from '@angular/router';
import {ErrorHandler, Injector, Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(private injector: Injector,
              public snackBar: MatSnackBar) {
    super();
  }

  private get router(): Router {
    return this.injector.get(Router);
  }

  private get ngZone(): NgZone {
    return this.injector.get(NgZone);
  }

  public handleError(error: any): void {
    if (error.status === 401) {
      this.ngZone.run(() => this.router.navigate(['/authentification']));
      this.snackBar.open('Veuillez-vous connecter pour accéder le site.', 'x', {duration: 1500});
    } else if (error.status === 403) {
      this.ngZone.run(() => this.router.navigate(['/home']));
      this.snackBar.open('Vous n\'avez pas les droits pour exécuter cette action.', 'x', {duration: 1500});
    } else {
      this.snackBar.open('Un problème est survenu, veuillez contacter l\'administrateur.', 'x', {duration: 1500});
    }

    super.handleError(error);
  }
}
