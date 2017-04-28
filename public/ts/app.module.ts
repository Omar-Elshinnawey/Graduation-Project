import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { LoginComponent }  from './login.component';
import { DashboardComponent } from './dashboard.component';
import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  imports:      [ 
                  BrowserModule,
                  FormsModule,
                  AppRoutingModule
                  ],
  declarations: [ LoginComponent,
                  DashboardComponent,
                  AppComponent],
  bootstrap:    [ AppComponent ],
})

export class AppModule { }