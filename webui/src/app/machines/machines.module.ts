import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MachinesRoutingModule} from './machines-routing.module';
import {MachinesListComponent} from './machines-list/machines-list.component';
import {SharedModule} from '../shared/shared.module';
import {
  MatButtonModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MachineComponent} from './machine/machine.component';
import { MaintenancesComponent } from './maintenances/maintenances.component';

@NgModule({
  declarations: [
    MachinesListComponent,
    MachineComponent,
    MaintenancesComponent
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
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class MachinesModule {
}
