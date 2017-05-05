import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MaterializeModule} from 'angular2-materialize/dist/index';

import { LoginComponent }  from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { AppComponent } from './components/app.component';
import {HeaderComponent} from './components/header.component';
import {HttpModule, Http} from '@angular/http';

import {HeaderService} from './services/header.service';
import {TranslationService} from './services/translate.service';

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
  declarations: [ LoginComponent,
                  DashboardComponent,
                  AppComponent,
                  HeaderComponent],
  bootstrap:    [ AppComponent ],
  providers:    [
                  HeaderService,
                  TranslationService                  
                ]
})

export class AppModule { }