import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {InventoryModule} from './inventory/inventory.module';
import {UsersModule} from './users/users.module';
import {SharedModule} from './shared/shared.module';
import {UserComponent} from './users/user/user.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {MachinesModule} from './machines/machines.module';
import {WorksheetsModule} from './worksheets/worksheets.module';
import {ProgramsModule} from './programs/programs.module';
import {AuthentificationModule} from './authentification/authentification.module';
import {ClientsModule} from './clients/clients.module';
import {AppErrorHandler} from './Error/app-error-handler.injector';
import {HomeComponent} from './home/home.component';
import {RapportsModule} from './rapports/rapports.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule,
    SharedModule,
    AuthentificationModule,
    InventoryModule,
    ClientsModule,
    MachinesModule,
    RapportsModule,
    ProgramsModule,
    MatIconModule,
    SharedModule,
    MachinesModule,
    WorksheetsModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UserComponent
  ]
})
export class AppModule {
}
