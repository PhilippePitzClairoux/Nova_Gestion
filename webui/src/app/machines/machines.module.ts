import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MachinesRoutingModule} from './machines-routing.module';
import {MachinesListComponent} from './machines-list/machines-list.component';
import {SharedModule} from '../shared/shared.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MachinesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MachinesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MachinesModule {
}
