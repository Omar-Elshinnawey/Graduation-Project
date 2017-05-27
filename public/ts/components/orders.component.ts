import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, TranslationService, OrderService, ToastService, DatabagService} from '../services';

import {CATEGORIES, Order} from '../view models';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/orders.component.html',
    styleUrls: ['assets/css/orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{

    categories: any;
    langchangeevent: any;
    orders: Order[] = []; 
    subs: Subscription[];
    tooltipParams = {position: 'top', tooltip: 'Click to view details', delay: 50}
   
    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private orderService: OrderService,
                public toast: ToastService,
                private databag: DatabagService){
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

    goToDetail(order:Order){
        this.databag.add('selectedOrder', order);
        this.router.navigate(['usersOrders/detail']);
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }
}