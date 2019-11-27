import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { AuthGuard } from './../Guard/auth.guard';

const routes: Routes = [
  { path: 'clients', component: ClientsListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
