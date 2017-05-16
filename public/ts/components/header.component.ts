import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {HeaderService} from '../services/header.service';
import {TranslationService} from '../services/translate.service';
import {AuthService} from '../services/auth.service';
import {MaterializeAction} from 'angular2-materialize/dist/index';

@Component({
    selector: 'nav-bar',
    templateUrl: '/assets/views/header.component.html',
    styleUrls: ['assets/css/header.component.css']
})
export class HeaderComponent{

    sideNav = new EventEmitter<string|MaterializeAction>();

    

    constructor(private router: Router, 
                public header: HeaderService, 
                public translate: TranslationService,
                private auth: AuthService){
    }

    changeLang(lang: string){
        this.closeSideNav();        
        this.translate.changeLang(lang);
    }

    logout(){
        this.closeSideNav();        
        this.auth.logout().subscribe();
        this.router.navigate(['']);
    }

    closeSideNav(){
        this.sideNav.emit({action: 'sideNav', params:['hide']});
    }

    onresize(){
        this.closeSideNav();
    }
}