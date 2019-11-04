import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatIconModule, MatPaginatorModule } from '@angular/material';

import { SharedModule } from './../shared/shared.module';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramComponent } from './program/program.component';


@NgModule({
  declarations: [ProgramsListComponent, ProgramComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    ProgramsRoutingModule
  ]
})
export class ProgramsModule { }
