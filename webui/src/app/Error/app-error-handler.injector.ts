import {ErrorHandler, Inject, Injector, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public handleError(error: any): void {
    this.toastrService.error(
      'Un problème est survenu, veuillez contacter l\'administrateur.',
      'Erreur',
      {
        onActivateTick: true
      }
    );

    super.handleError(error);
  }
}
