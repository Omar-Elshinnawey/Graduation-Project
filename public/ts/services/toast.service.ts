import {Injectable, EventEmitter} from '@angular/core';

declare var Materialize:any;

@Injectable()
export class ToastService{
    
    create(text:string, duration: number = 5000, styles:string = 'rounded'){
        Materialize.toast(text, duration, styles);
    }
}