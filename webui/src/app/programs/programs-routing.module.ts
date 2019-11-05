import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramComponent } from './program/program.component';


const routes: Routes = [
  { path: 'programs', component: ProgramsListComponent },
  { path: 'programs/:id', component: ProgramComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
