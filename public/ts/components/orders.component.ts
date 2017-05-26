import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize/dist/index';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, TranslationService, OrderService} from '../services';

import {CATEGORIES, Order} from '../view models';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/orders.component.html',
})
export class OrdersComponent implements OnInit, OnDestroy{

    categories: any;
    selectAction = new EventEmitter<string|MaterializeAction>();
    langchangeevent: any;
    orders: Order[] = [];
    error: string; 
    subs: Subscription[];
   
    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private orderService: OrderService){
        this.categories = CATEGORIES;
        this.subs = new Array<Subscription>();
    }

    ngOnInit(){
        this.header.show();
    }

    onchange(value:number){
        var sub = this.orderService.getOrdersInCategory(value).subscribe(
            (orders) => {this.orders = orders as Order[]},
            (err) => {this.error = err}
        );
        this.subs.push(sub);
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }
}