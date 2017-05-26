import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Http} from '@angular/http';

import {AuthService} from './auth.service';
import {ToastService} from './toast.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private auth: AuthService, 
                private router: Router,
                public toast: ToastService){}

    canActivate(){

        return this.auth.isLoggedIn()
        .toPromise()
        .then((result:string) => {

            return true;

        }).catch((err:string) => {

            this.toast.create(JSON.parse(err).message,'danger');
            
            this.router.navigate(['/login']);
            localStorage.clear();
            return false;
        });
    }
}