import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryComponent} from './inventory/inventory.component';
import {SharedModule} from '../shared/shared.module';
import {InventoryRoutingModule} from './inventory-routing.module';
import {ToolsListComponent} from './tools/tools-list/tools-list.component';

@NgModule({
  declarations: [
    ToolsListComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InventoryRoutingModule,
  ]
})
export class InventoryModule {
}
