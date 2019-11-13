import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorksheetsListComponent} from './worksheets-list/worksheets-list.component';
import {WorksheetComponent} from './worksheet/worksheet.component';

const routes: Routes = [
  {
    path: 'worksheets',
    component: WorksheetsListComponent
  },
  {
    path: 'worksheet/:id',
    component: WorksheetComponent
  },
  {
    path: 'worksheet',
    component: WorksheetComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksheetsRoutingModule {
}
