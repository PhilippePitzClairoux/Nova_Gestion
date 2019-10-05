import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification/authentification.component';


@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    AuthentificationRoutingModule
  ]
})
export class AuthentificationModule { }
