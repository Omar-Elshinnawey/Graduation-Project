import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {HeaderService, TranslationService} from '../services';

import {CATEGORIES} from '../view models';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/dashboard.component.html',
    styleUrls:['assets/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit{

    categories: any;

    constructor(private router: Router, public header: HeaderService, public translate: TranslationService){
        this.categories = CATEGORIES;
    }

    ngOnInit(){
        this.header.show();
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }
}