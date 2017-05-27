import { Injectable } from '@angular/core';
import{Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {Order} from '../view models';


@Injectable()
export class OrderService {
    
    constructor(private http:Http, private router: Router){}

    getOrdersInCategory(category:number): Observable<Order[]|string>{
        return this.http.get(`/orders/${category}`)
        .map(this.extractOrders)
        .catch(this.handleError);
    }

    getOrderDetail(id: string):Observable<Order|string>{
        return this.http.get(`/order/${id}`)
        .map(this.extractOrder)
        .catch(this.handleError);
    }

    deleteOrder(id: string):Observable<string>{
        return this.http.get(`/order/delete/${id}`)
        .map((res: Response) => {return res.text()})
        .catch(this.handleError);
    }

    extractOrders(res: Response): Order[]{
        return JSON.parse(res.text()) as Order[];
    }

    extractOrder(res: Response): Order{
        return JSON.parse(res.text()) as Order;
    }

    handleError(res:Response):string{
        if(res.status === 401)
            this.router.navigate(['/login']);

        return JSON.parse(res.text()).message;
    }

}