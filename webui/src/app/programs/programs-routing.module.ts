import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramComponent } from './program/program.component';
import { AuthGuard } from '../Guard/auth.guard';


const routes: Routes = [
  { path: 'programs', component: ProgramsListComponent, canActivate: [AuthGuard] },
  { path: 'programs/:id', component: ProgramComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
