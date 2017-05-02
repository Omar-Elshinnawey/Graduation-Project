import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {HeaderService} from '../services/header.service';
import {TranslationService} from '../services/translate.service';

import {CATEGORIES} from '../view models/categories';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/dashboard.component.html',
    styleUrls:['assets/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit{

    categories: any;

    constructor(private router: Router, public header: HeaderService, private translate: TranslationService){
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