import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize/dist/index';
import {HttpModule, Http} from '@angular/http';

import * as components from './components';

import * as services from './services';

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
                  TranslateModule.forRoot({
                    loader:{
                      provide: TranslateLoader,
                      useFactory: (createTranslateLoader),
                      deps:[Http]
                    }
                  })
                  ],
  declarations: [ components.LoginComponent,
                  components.DashboardComponent,
                  components.AppComponent,
                  components.HeaderComponent,
                  components.OrdersComponent,
                  components.UsersComponent,
                  components.OrderDetailComponent],
  bootstrap:    [ components.AppComponent ],
  providers:    [
                  services.HeaderService,
                  services.TranslationService,
                  services.AuthService,
                  services.AuthGuard,
                  services.OrderService,
                  services.ToastService,
                  services.UsersService,
                  services.DatabagService           
                ]
})

export class AppModule { }