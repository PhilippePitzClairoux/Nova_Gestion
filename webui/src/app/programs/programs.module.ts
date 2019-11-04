import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramComponent } from './program/program.component';


@NgModule({
  declarations: [ProgramsListComponent, ProgramComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule
  ]
})
export class ProgramsModule { }
