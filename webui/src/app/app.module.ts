import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule, MatMenuModule, MatIconModule, MatSidenavModule, MatButtonModule, MatCardModule  } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthentificationModule,
    UsersModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
