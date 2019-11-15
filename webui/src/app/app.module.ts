import { ClientsModule } from './clients/clients.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
// import { AuthentificationModule } from './authentification/authentification.module';
import {InventoryModule} from './inventory/inventory.module';
import {UsersModule} from './users/users.module';
import {SharedModule} from './shared/shared.module';
import {UserComponent} from './users/user/user.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {MachinesModule} from './machines/machines.module';
import {WorksheetsModule} from './worksheets/worksheets.module';
import {ProgramsModule} from './programs/programs.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // AuthentificationModule,
    UsersModule,
    SharedModule,
    InventoryModule,
    ClientsModule,
    MachinesModule,
    ProgramsModule,
    MatIconModule,
    SharedModule,
    AppRoutingModule,
    MatIconModule,
    AppRoutingModule,
    MachinesModule,
    WorksheetsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UserComponent
  ]
})
export class AppModule { }
