import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestRapportsComponent } from './test-rapports/test-rapports.component';

const routes: Routes = [
  { path: 'rapports', component: TestRapportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportsRoutingModule { }
