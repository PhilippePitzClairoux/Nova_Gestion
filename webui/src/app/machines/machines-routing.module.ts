import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MachinesListComponent} from './machines-list/machines-list.component';
import {MachineComponent} from './machine/machine.component';

const routes: Routes = [
  { path: 'machines', component: MachinesListComponent },
  { path: 'machine/:id', component: MachineComponent }
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
