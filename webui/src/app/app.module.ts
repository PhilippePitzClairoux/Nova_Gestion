import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {InventoryModule} from './inventory/inventory.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    InventoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
