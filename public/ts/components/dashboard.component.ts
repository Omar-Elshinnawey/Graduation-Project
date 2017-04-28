import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HeaderService} from '../services/header.service';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/dashboard.component.html'
})
export class DashboardComponent implements OnInit{

    constructor(private router: Router, public header: HeaderService){}

    ngOnInit(){
        this.header.show();
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }
}