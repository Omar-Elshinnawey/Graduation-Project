import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, TranslationService, OrderService, ToastService, DatabagService} from '../services';

import {CATEGORIES, Order} from '../view models';

@Component({
    selector: 'order-detail',
    templateUrl: '/assets/views/order-detail.component.html',
    styleUrls: ['assets/css/order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy{

    categories: any;
    langchangeevent: any;
    order: Order;
    subs: Subscription[];
   
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

        if(!this.databag.get('selectedOrder')){
            this.router.navigate(['/usersOrders'])
            this.toast.create('The order was not found', 'danger', 2000);
        }else{
            this.order = this.databag.get('selectedOrder');
            this.getOrderDetail();
        }
    }

    getOrderDetail(){
        var sub = this.orderService.getOrderDetail(this.order._id)
        .subscribe(
            (order) => this.order = order as Order,
            (err) => {this.toast.create(err, 'danger')}
        );

        this.subs.push(sub);
    }

    deleteOrder(){
        var sub = this.orderService.deleteOrder(this.order._id)
        .subscribe(
            (res) => this.goToOrders(),
            (err) => {this.toast.create(err, 'danger')}
        );

        this.subs.push(sub);
    }

    goToOrders(){
        this.router.navigate(['/usersOrders']);
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
        this.databag.remove('selectedOrder');
    }
}