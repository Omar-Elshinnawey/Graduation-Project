import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize/dist/index';

import {HeaderService, TranslationService, OrderService} from '../services';

import {CATEGORIES, Order} from '../view models';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/orders.component.html',
})
export class OrdersComponent implements OnInit{

    categories: any;
    selectAction = new EventEmitter<string|MaterializeAction>();
    langchangeevent: any;
    orders: Order[] = [];
    error: string;    

    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private orderService: OrderService){
        this.categories = CATEGORIES;
    }

    ngOnInit(){
        this.header.show();
    }

    onchange(value:number){
        this.orderService.getOrdersInCategory(value).subscribe(
            (orders) => {this.orders = orders as Order[]},
            (err) => {this.error = err}
        );
    }
}