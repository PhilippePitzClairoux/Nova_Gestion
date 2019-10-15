import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonComponent} from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent
  ],
  exports: [
    ReactiveFormsModule,
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
