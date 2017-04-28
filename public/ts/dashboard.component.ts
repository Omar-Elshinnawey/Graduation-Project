import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: '/assets/views/dashboard.component.html'
})
export class DashboardComponent{

    constructor(private router: Router){}

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }
}