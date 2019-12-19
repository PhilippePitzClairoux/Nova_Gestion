import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatFormFieldModule, MatSelectModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import {SharedModule} from '../shared/shared.module';
import {RapportsRoutingModule} from './rapports-routing.module';
import {RapportBlanksComponent} from './rapport-blanks/rapport-blanks.component';
import {RapportTasksComponent} from './rapport-tasks/rapport-tasks.component';
import {RapportsComponent} from './rapports/rapports.component';

@NgModule({
  declarations: [
    RapportsComponent,
    RapportBlanksComponent,
    RapportTasksComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    NgxMatSelectSearchModule,
    NgxChartsModule,
    RapportsRoutingModule
  ]
})
export class RapportsModule {
}
