import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { UsersModule } from './users/users.module';
import { UserComponent } from './users/user/user.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import {InventoryModule} from './inventory/inventory.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthentificationModule,
    InventoryModule,
    MatIconModule,
    UsersModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UserComponent
  ]
})
export class AppModule {
}
