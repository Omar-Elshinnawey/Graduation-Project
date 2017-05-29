import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, TranslationService, RefundService, ToastService, DatabagService} from '../services';

import {Refund} from '../view models';

@Component({
    selector: 'refund',
    templateUrl: '/assets/views/refund.component.html',
})
export class RefundComponent implements OnInit, OnDestroy{

    categories: any;
    langchangeevent: any;
    refunds: Refund[] = []; 
    subs: Subscription[];
    tooltipParams = {position: 'top', tooltip: 'Click to view details', delay: 50}
   
    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private refundService: RefundService,
                public toast: ToastService,
                private databag: DatabagService){
        this.subs = new Array<Subscription>();
    }

    ngOnInit(){
        this.header.show();
        this.getRefunds();
    }

    getRefunds(){
        var sub = this.refundService.getRefunds()
        .subscribe(
            (refunds: Refund[]) => this.refunds = refunds,
            (err:string) => this.toast.create(err, 'danger')
        );
        this.subs.push(sub);
    }

    acceptRefund(refund:Refund){
        this.refundService.acceptRefund(refund._id)
        .toPromise()
        .then((res: string) => refund.state = 1)
        .catch((err: string) => this.toast.create(err, 'danger'));
    }
    
    denyRefund(refund:Refund){
        this.refundService.denyRefund(refund._id)
        .toPromise()
        .then((res: string) => refund.state = 2)
        .catch((err: string) => this.toast.create(err, 'danger'));
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }
}