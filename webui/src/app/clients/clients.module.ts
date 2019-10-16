import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';


@NgModule({
  declarations: [ClientsListComponent, EditClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
