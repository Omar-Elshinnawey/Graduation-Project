import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize/dist/index';
import {HttpModule, JsonpModule, Http} from '@angular/http';

import { LoginComponent }  from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { AppComponent } from './components/app.component';
import {HeaderComponent} from './components/header.component';
import {OrdersComponent} from './components/orders.component';

import {HeaderService} from './services/header.service';
import {TranslationService} from './services/translate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {OrderService} from './services/order.service';
import {ToastService} from './services/toast.service';

import {AppRoutingModule} from './app-routing.module';

export function createTranslateLoader(http: Http){
  return new TranslateHttpLoader(http, '/assets/i18n/','.json');
}

@NgModule({
  imports:      [ 
                  BrowserModule,
                  FormsModule,
                  MaterializeModule,
                  AppRoutingModule,
                  HttpModule,
                  JsonpModule,
                  TranslateModule.forRoot({
                    loader:{
                      provide: TranslateLoader,
                      useFactory: (createTranslateLoader),
                      deps:[Http]
                    }
                  })
                  ],
  declarations: [ LoginComponent,
                  DashboardComponent,
                  AppComponent,
                  HeaderComponent,
                  OrdersComponent],
  bootstrap:    [ AppComponent ],
  providers:    [
                  HeaderService,
                  TranslationService,
                  AuthService,
                  AuthGuard,
                  OrderService,
                  ToastService           
                ]
})

export class AppModule { }