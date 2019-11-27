import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MachinesListComponent} from './machines-list/machines-list.component';
import {MachineComponent} from './machine/machine.component';
import { AuthGuard } from '../Guard/auth.guard';

const routes: Routes = [
  { path: 'machines', component: MachinesListComponent, canActivate: [AuthGuard] },
  { path: 'machine/:id', component: MachineComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MachinesRoutingModule {
}
