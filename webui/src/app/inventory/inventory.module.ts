import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryComponent} from './inventory/inventory.component';
import {SharedModule} from '../shared/shared.module';
import {InventoryRoutingModule} from './inventory-routing.module';
import {ToolsListComponent} from './tools/tools-list/tools-list.component';
import {
  MatButtonModule, MatDialogModule,
  MatIconModule,
  MatInputModule, MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToolComponent} from './tools/tool/tool.component';

@NgModule({
  declarations: [
    ToolsListComponent,
    InventoryComponent,
    ToolComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InventoryRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
  ],
  entryComponents: [
    ToolComponent
  ]
})
export class InventoryModule {
}
