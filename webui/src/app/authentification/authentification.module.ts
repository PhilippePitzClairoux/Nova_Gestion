import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MatCardModule } from '@angular/material';


@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    AuthentificationRoutingModule
  ]
})
export class AuthentificationModule { }
