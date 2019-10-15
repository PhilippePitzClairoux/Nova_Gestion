import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {InventoryModule} from './inventory/inventory.module';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    InventoryModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
