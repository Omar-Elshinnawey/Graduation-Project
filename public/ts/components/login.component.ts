import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslationService} from '../services/translate.service';

import {HeaderService} from '../services/header.service';
import {AuthService} from '../services/auth.service';
import {ToastService} from '../services/toast.service';

@Component({
    selector: 'login',
    templateUrl: '/assets/views/login.component.html',
    styleUrls: ['assets/css/login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private auth: AuthService,
                public toast: ToastService){}

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
        this.auth.login(this.model.username, this.model.password)
        .subscribe(
            (user) => {
                localStorage.setItem('currentUser', user.username)
                this.router.navigate(['/dashboard']);
        },
            (err) => {
                this.toast.create(err);
            }
        );
    }
}