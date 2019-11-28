import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorksheetsListComponent} from './worksheets/worksheets-list/worksheets-list.component';
import {WorksheetComponent} from './worksheets/worksheet/worksheet.component';
import {AuthGuard} from './Guard/auth.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'worksheets', component: WorksheetsListComponent, canActivate: [AuthGuard]},
  {path: 'worksheet/:id', component: WorksheetComponent, canActivate: [AuthGuard]},
  {path: 'worksheet', component: WorksheetComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
