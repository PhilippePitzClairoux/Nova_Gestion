import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';

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
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
