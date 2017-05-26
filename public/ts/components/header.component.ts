import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, TranslationService, AuthService} from '../services';
import {MaterializeAction} from 'angular2-materialize/dist/index';

@Component({
    selector: 'nav-bar',
    templateUrl: '/assets/views/header.component.html',
    styleUrls: ['assets/css/header.component.css']
})
export class HeaderComponent implements OnDestroy{

    sideNav = new EventEmitter<string|MaterializeAction>();

    subs: Subscription[];

    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private auth: AuthService){
        this.subs = new Array<Subscription>();
    }

    changeLang(lang: string){
        this.closeSideNav();        
        this.translate.changeLang(lang);
    }

    logout(){
        this.closeSideNav();        
        this.subs.push(this.auth.logout().subscribe());
        this.router.navigate(['']);
    }

    closeSideNav(){
        this.sideNav.emit({action: 'sideNav', params:['hide']});
    }

    onresize(){
        this.closeSideNav();
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }
}