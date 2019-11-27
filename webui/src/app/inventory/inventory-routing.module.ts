import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InventoryComponent} from './inventory/inventory.component';
import { AuthGuard } from '../Guard/auth.guard';

const routes: Routes = [
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] }
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
export class InventoryRoutingModule {
}
