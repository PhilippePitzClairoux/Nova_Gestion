import { ProgramsModule } from './programs/programs.module';
import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { AuthentificationModule } from './authentification/authentification.module';
import {InventoryModule} from './inventory/inventory.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './users/user/user.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // AuthentificationModule,
    UsersModule,
    ProgramsModule,
    SharedModule,
    InventoryModule,
    MatIconModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UserComponent
  ]
})
export class AppModule {
}
