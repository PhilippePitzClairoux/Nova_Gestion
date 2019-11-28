import { Router } from '@angular/router';
import { ErrorHandler, Injector, Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
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
      this.toastrService.error('Veuillez-vous connecter', 'Erreur');
    } else if (error.status === 403) {
      this.ngZone.run(() => this.router.navigate(['/home']));
      this.toastrService.error('Accès Interdit', 'Erreur');
    } else {
      this.toastrService.error(
        'Un problème est survenu, veuillez contacter l\'administrateur.',
        'Erreur',
        {
          onActivateTick: true
        }
      );
    }

    super.handleError(error);
  }
}
