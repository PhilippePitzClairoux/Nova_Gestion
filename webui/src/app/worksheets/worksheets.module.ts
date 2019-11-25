import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule, MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatAutocompleteModule
} from '@angular/material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import {WorksheetsListComponent} from './worksheets-list/worksheets-list.component';
import {WorksheetsRoutingModule} from './worksheets-routing.module';
import {SharedModule} from '../shared/shared.module';
import { WorksheetComponent } from './worksheet/worksheet.component';

@NgModule({
  declarations: [
    WorksheetsListComponent,
    WorksheetComponent
  ],
  imports: [
    CommonModule,
    WorksheetsRoutingModule,
    FormsModule,
    MatInputModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule
  ]
})
export class WorksheetsModule {
}
