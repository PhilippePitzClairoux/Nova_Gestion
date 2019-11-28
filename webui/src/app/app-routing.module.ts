import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorksheetsListComponent } from './worksheets/worksheets-list/worksheets-list.component';
import { WorksheetComponent } from './worksheets/worksheet/worksheet.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'worksheets', component: WorksheetsListComponent },
  { path: 'worksheet/:id', component: WorksheetComponent },
  { path: 'worksheet', component: WorksheetComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
