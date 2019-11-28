import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatAutocompleteModule
} from '@angular/material';

import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

import {SharedModule} from '../shared/shared.module';
import {ProgramsRoutingModule} from './programs-routing.module';
import {ProgramsListComponent} from './programs-list/programs-list.component';
import {ProgramComponent} from './program/program.component';


@NgModule({
  declarations: [ProgramsListComponent, ProgramComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    ProgramsRoutingModule,
    NgxMatSelectSearchModule
  ]
})
export class ProgramsModule {
}
