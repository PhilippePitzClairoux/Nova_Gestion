import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonComponent} from './button/button.component';
import {HeaderComponent} from './header/header.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    ConfirmationDialogComponent
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule {
}
