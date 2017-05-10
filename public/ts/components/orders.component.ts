import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize/dist/index';
import {LangChangeEvent} from '@ngx-translate/core';

import {HeaderService} from '../services/header.service';
import {TranslationService} from '../services/translate.service';

import {CATEGORIES} from '../view models/categories';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/orders.component.html',
})
export class OrdersComponent implements OnInit{

    categories: any;
    selectAction = new EventEmitter<string|MaterializeAction>();
    langchangeevent: any;
    

    constructor(private router: Router, public header: HeaderService, public translate: TranslationService){
        this.categories = CATEGORIES;
    }

    ngOnInit(){
        this.header.show();
    }
}