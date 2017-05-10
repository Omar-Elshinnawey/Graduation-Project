import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {HeaderService} from '../services/header.service';
import {TranslationService} from '../services/translate.service';
import {MaterializeAction} from 'angular2-materialize/dist/index'

@Component({
    selector: 'nav-bar',
    templateUrl: '/assets/views/header.component.html',
    styleUrls: ['assets/css/header.component.css']
})
export class HeaderComponent{

    sideNav = new EventEmitter<string|MaterializeAction>();

    

    constructor(private router: Router, public header: HeaderService, public translate: TranslationService){
    }

    changeLang(lang: string){
        this.translate.changeLang(lang);
        this.closeSideNav();
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
        this.closeSideNav();
    }

    closeSideNav(){
        this.sideNav.emit({action: 'sideNav', params:['hide']});
    }

    onresize(){
        this.closeSideNav();
    }
}