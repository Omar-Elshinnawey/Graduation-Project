import { Injectable } from '@angular/core';
import{Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {User} from '../view models';
@Injectable()
export class UsersService{

    constructor(private http: Http, private router: Router){}

    getUsers(): Observable<User[]>{
        return this.http.get('/auth/users')
        .map(this.extractUsers)
        .catch(this.handleError);
    }

    toggleBan(user: User): Observable<string>{
        
        var url = `/auth/${user.isbanned? 'unban': 'ban'}/${user.username}`;

        return this.http.post(url, null)
        .map((res: Response) => {return res.text()})
        .catch(this.handleError);
    }

    getUserDetail(user: User): Observable<string|number>{
        return this.http.get(`/providers/${user.username}`)
        .map((res: Response) => { return JSON.parse(res.text()).average })
        .catch(this.handleError);
    }

    extractUsers(response: Response): User[]{
        return JSON.parse(response.text()) as User[];
    }

    handleError(response: Response){
        if(response.status === 401)
            this.router.navigate(['/login']);

        return JSON.parse(response.text()).message;
    }
}