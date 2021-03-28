import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {NgxTimerModule} from 'ngx-timer';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TasksComponent} from './tasks/tasks.component';
import {WorksheetComponent} from './worksheet/worksheet.component';
import {WorksheetsListComponent} from './worksheets-list/worksheets-list.component';
import {WorksheetsRoutingModule} from './worksheets-routing.module';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    WorksheetsListComponent,
    WorksheetComponent,
    TasksComponent
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
    NgxMaterialTimepickerModule,
    NgxMatSelectSearchModule
  ]
})
export class WorksheetsModule {
}
