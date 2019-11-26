import { AuthGuard } from './Guard/auth.guard';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {ToastrModule} from 'ngx-toastr';

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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 2000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      maxOpened: 5,
      autoDismiss: true,
      newestOnTop: true,
      resetTimeoutOnDuplicate: true
    }),
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule,
    SharedModule,
    AuthentificationModule,
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
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    AuthGuard
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
