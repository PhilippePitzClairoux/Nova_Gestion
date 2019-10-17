import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [ClientsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
