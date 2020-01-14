import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InventoryComponent} from './inventory/inventory.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryComponent }
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
