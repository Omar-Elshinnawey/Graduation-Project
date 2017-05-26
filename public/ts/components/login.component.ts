import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Rx'

import {HeaderService, AuthService, ToastService, TranslationService} from '../services';

@Component({
    selector: 'login',
    templateUrl: '/assets/views/login.component.html',
    styleUrls: ['assets/css/login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

    subs: Subscription[];

    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private auth: AuthService,
                public toast: ToastService){
                    this.subs = new Array<Subscription>();
                }

    model = {
        username: '',
        password: ''
    }

    ngOnInit(){
        this.header.hide();
        if(localStorage.getItem('currentUser'))
            this.router.navigate(['/dashboard']);
    }

    onsubmit(){
        var sub = this.auth.login(this.model.username, this.model.password)
        .subscribe(
            (user) => {
                localStorage.setItem('currentUser', user.username)
                this.router.navigate(['/dashboard']);
        },
            (err) => {
                this.toast.create(err,'danger');
            }
        );

        this.subs.push(sub);
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }
}