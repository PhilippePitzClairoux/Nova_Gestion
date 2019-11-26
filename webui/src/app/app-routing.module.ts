import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { WorksheetsListComponent } from './worksheets/worksheets-list/worksheets-list.component';
import { WorksheetComponent } from './worksheets/worksheet/worksheet.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: 'worksheets', component: WorksheetsListComponent, canActivate: [AuthGuard] },
  { path: 'worksheet/:id', component: WorksheetComponent, canActivate: [AuthGuard] },
  { path: 'worksheet', component: WorksheetComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/programs', pathMatch: 'full' },
  { path: '**', redirectTo: '/programs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
