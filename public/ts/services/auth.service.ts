import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthService{

    private url = '/auth';
    constructor(private http:Http){}

    login(username:string, password:string){
        
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: header});

        return this.http.post(this.url+'/login', {username: username, password: password}, options)
        .map(this.extractUser)
        .catch(this.handleError);
    }

    logout(){
        localStorage.clear();
        return this.http.get(this.url+'/logout').map(res => {return res.text()});
    }

    extractUser(res:Response){
        if(res.status === 200)
            return JSON.parse(res.text());
    }

    handleError(res:Response){
        return Observable.throw(JSON.parse(res.text()).message);
    }

    isLoggedIn(){
        return this.http.get(this.url+'/isAuth')
        .map(res => {return res.text() === 'true'});
    }
    
}