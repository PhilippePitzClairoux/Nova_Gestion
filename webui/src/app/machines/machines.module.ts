import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MachinesRoutingModule} from './machines-routing.module';
import {MachinesListComponent} from './machines-list/machines-list.component';
import {SharedModule} from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
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
