import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {AuthentificationRoutingModule} from './authentification-routing.module';
import {AuthentificationComponent} from './authentification/authentification.component';
import {SharedModule} from '../shared/shared.module';

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
