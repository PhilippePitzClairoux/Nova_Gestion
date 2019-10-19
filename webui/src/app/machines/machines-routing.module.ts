import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MachinesListComponent} from './machines-list/machines-list.component';

const routes: Routes = [
  {
    path: 'machines',
    component: MachinesListComponent
  }
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
