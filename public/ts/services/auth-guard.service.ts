import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Http} from '@angular/http';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private auth: AuthService, private router: Router){}

    canActivate(){
        return this.auth.isLoggedIn().map((result)=>{
            if(result)
                return true;
            
            this.router.navigate(['/login']);
            return false;
        });
    }
}