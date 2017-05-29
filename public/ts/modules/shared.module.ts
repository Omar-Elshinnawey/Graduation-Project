import { NgModule, ModuleWithProviders}      from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize/dist/index';
import {HttpModule} from '@angular/http';

import * as services from '../services';

@NgModule({
  imports:      [ CommonModule ],
  exports:      [ 
                  FormsModule,
                  MaterializeModule,
                  HttpModule,
                  RouterModule
                ]

})
  export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [services.HeaderService,
                  services.TranslationService,
                  services.AuthService,
                  services.AuthGuard,
                  services.ToastService,
                  services.DatabagService,
                  ]
        };
    }
  }