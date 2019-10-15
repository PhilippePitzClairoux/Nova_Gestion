import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonComponent} from './button/button.component';
import {HeaderComponent} from './header/header.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
    TruncatePipe
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule {
}
