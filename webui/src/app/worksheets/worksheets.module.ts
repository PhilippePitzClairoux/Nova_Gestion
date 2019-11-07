import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorksheetsListComponent} from './worksheets-list/worksheets-list.component';
import {WorksheetsRoutingModule} from './worksheets-routing.module';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule, MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {WorksheetComponent} from './worksheet/worksheet.component';
import {NgxTimerModule} from 'ngx-timer';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


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
    NgxTimerModule,
    NgxMaterialTimepickerModule
  ]
})
export class WorksheetsModule {
}
