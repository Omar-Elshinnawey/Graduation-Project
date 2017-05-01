import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslationService} from '../services/translate.service';

import {HeaderService} from '../services/header.service';

@Component({
    selector: 'login',
    templateUrl: '/assets/views/login.component.html',
    styleUrls: ['assets/css/login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private router: Router, public header: HeaderService, private translate: TranslationService){}

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
        console.log(this.model.username+'\n'+this.model.password);
        localStorage.setItem('currentUser', this.model.username);
        this.router.navigate(['/dashboard']);
    }
}