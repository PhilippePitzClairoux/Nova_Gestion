import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ClientsListComponent} from './clients-list/clients-list.component';

const routes: Routes = [
  {path: 'clients', component: ClientsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
