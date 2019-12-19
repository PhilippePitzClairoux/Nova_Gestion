import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RapportsComponent} from './rapports/rapports.component';

const routes: Routes = [
  { path: 'rapports', component: RapportsComponent }
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
export class RapportsRoutingModule {
}
