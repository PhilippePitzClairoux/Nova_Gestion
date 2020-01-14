import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule, MatSortModule, MatPaginatorModule
} from '@angular/material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    SharedModule,
    UsersRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule
  ]
})
export class UsersModule { }
