import { Injectable } from '@angular/core';
import{Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {Refund} from '../view models';


@Injectable()
export class RefundService {
    
    constructor(private http:Http, private router: Router){}

    getRefunds(): Observable<Refund[]|string>{
        return this.http.get('/refunds')
        .map(this.extractRefunds)
        .catch(this.handleError);
    }

    acceptRefund(id:string): Observable<string>{
        return this.http.post(`/refunds/${id}/1`,{})
        .map((res: Response) => {return res.text()})
        .catch(this.handleError);
    }

    denyRefund(id:string): Observable<string>{
        return this.http.post(`/refunds/${id}/0`,{})
        .map((res: Response) => {return res.text()})
        .catch(this.handleError);
    }

    extractRefunds(res: Response){
        return JSON.parse(res.text()) as Refund[];
    }

    handleError(res:Response):string{
        if(res.status === 401)
            this.router.navigate(['/login']);

        return JSON.parse(res.text()).message;
    }

}