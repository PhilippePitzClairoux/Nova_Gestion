import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule, MatButtonModule } from '@angular/material';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
