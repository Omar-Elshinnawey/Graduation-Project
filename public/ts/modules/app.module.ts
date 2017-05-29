import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Http} from '@angular/http';

import {LoginComponent, HeaderComponent,AppComponent} from '../components';

import {AppRoutingModule} from './app-routing.module';

export function createTranslateLoader(http: Http){
  return new TranslateHttpLoader(http, '/assets/i18n/','.json');
}

@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  SharedModule,
                  SharedModule.forRoot(),
                  TranslateModule.forRoot({
                    loader:{
                      provide: TranslateLoader,
                      useFactory: (createTranslateLoader),
                      deps:[Http]
                    }
                  })
                  ],
  declarations: [LoginComponent,
                AppComponent,
                HeaderComponent
                ],
  bootstrap:    [ AppComponent ],
})

export class AppModule { }