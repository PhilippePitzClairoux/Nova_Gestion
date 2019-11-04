import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorksheetsListComponent} from './worksheets-list/worksheets-list.component';

const routes: Routes = [
  {path: 'worksheets', component: WorksheetsListComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksheetsRoutingModule {
}
