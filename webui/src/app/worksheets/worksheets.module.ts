import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorksheetsListComponent} from './worksheets-list/worksheets-list.component';
import {WorksheetsRoutingModule} from './worksheets-routing.module';


@NgModule({
  declarations: [
    WorksheetsListComponent
  ],
  imports: [
    CommonModule,
    WorksheetsRoutingModule
  ]
})
export class WorksheetsModule {
}
