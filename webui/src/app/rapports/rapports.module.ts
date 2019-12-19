import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import { SharedModule } from './../shared/shared.module';
import { RapportsRoutingModule } from './rapports-routing.module';
import { TestRapportsComponent } from './test-rapports/test-rapports.component';


@NgModule({
  declarations: [TestRapportsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    SharedModule,
    NgxMatSelectSearchModule,
    NgxChartsModule,
    RapportsRoutingModule
  ]
})
export class RapportsModule { }
