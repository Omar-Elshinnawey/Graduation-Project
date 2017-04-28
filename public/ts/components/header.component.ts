import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {HeaderService} from '../services/header.service';

@Component({
    selector: 'nav-bar',
    templateUrl: '/assets/views/header.component.html',
    styleUrls: ['assets/css/header.component.css']
})
export class HeaderComponent{

    constructor(private router: Router, public header: HeaderService){}

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }
}