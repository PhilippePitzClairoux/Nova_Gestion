import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {InventoryRoutingModule} from './inventory-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

import {InventoryComponent} from './inventory/inventory.component';
import {ToolsListComponent} from './tools/tools-list/tools-list.component';
import {ToolComponent} from './tools/tool/tool.component';
import {BlanksListComponent} from './blank/blanks-list/blanks-list.component';
import {BlankComponent} from './blank/blank/blank.component';

@NgModule({
  declarations: [
    ToolsListComponent,
    InventoryComponent,
    ToolComponent,
    BlanksListComponent,
    BlankComponent
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
    MatCheckboxModule,
    NgxMatSelectSearchModule
  ],
  entryComponents: [
    ToolComponent,
    BlankComponent
  ]
})
export class InventoryModule {
}
