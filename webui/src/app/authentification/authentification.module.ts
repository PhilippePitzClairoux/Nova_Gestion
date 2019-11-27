import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';

import {AuthentificationRoutingModule} from './authentification-routing.module';
import {AuthentificationComponent} from './authentification/authentification.component';
import {SharedModule} from './../shared/shared.module';

@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AuthentificationRoutingModule
  ]
})
export class AuthentificationModule {
}
