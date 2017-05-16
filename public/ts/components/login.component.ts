import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslationService} from '../services/translate.service';

import {HeaderService} from '../services/header.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: '/assets/views/login.component.html',
    styleUrls: ['assets/css/login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private auth: AuthService){}

    model = {
        username: '',
        password: ''
    }

    error: string;

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
                this.error = err;
                console.log(this.error);
            }
        );
    }
}