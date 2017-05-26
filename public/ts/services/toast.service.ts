import {Injectable, EventEmitter} from '@angular/core';

declare var Materialize:any;

@Injectable()
export class ToastService{
    
    create(text:string, styles:string, duration: number = 3000){
        styles += ' rounded'
        Materialize.toast(text, duration, styles);
    }
}