import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientsRoutingModule} from './clients-routing.module';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  declarations: [ClientsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    SharedModule,
    ClientsRoutingModule,
    MatSortModule
  ]
})
export class ClientsModule {
}
