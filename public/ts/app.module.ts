import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { LoginComponent }  from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { AppComponent } from './components/app.component';
import {HeaderComponent} from './components/header.component';

import {HeaderService} from './services/header.service'

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  imports:      [ 
                  BrowserModule,
                  FormsModule,
                  AppRoutingModule
                  ],
  declarations: [ LoginComponent,
                  DashboardComponent,
                  AppComponent,
                  HeaderComponent],
  bootstrap:    [ AppComponent ],
  providers: [HeaderService]
})

export class AppModule { }