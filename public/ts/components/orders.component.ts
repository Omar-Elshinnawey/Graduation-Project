import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize/dist/index';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, TranslationService, OrderService, ToastService} from '../services';

import {CATEGORIES, Order} from '../view models';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/orders.component.html',
    styleUrls: ['assets/css/orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{

    categories: any;
    selectAction = new EventEmitter<string|MaterializeAction>();
    langchangeevent: any;
    orders: Order[] = []; 
    subs: Subscription[];
   
    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private orderService: OrderService,
                public toast: ToastService){
        this.categories = CATEGORIES;
        this.subs = new Array<Subscription>();
    }

    ngOnInit(){
        this.header.show();
    }

    getOrders(value:number){
        var sub = this.orderService.getOrdersInCategory(value).subscribe(
            (orders) => {
                if(!orders || orders.length === 0)
                    this.toast.create('No orders in this category', 'warning', 2000);
                else
                    this.orders = orders as Order[]
            },
            (err) => {this.toast.create(err, 'danger')}
        );
        this.subs.push(sub);
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }
}