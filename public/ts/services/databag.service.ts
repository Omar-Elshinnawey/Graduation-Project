import {Injectable} from '@angular/core';

@Injectable()
export class DatabagService{
    data = {};

    add(key: string, data:any){
        this.data[key] = data;
    }

    remove(key: string){
        delete this.data[key];
    }

    get(key: string){
        return this.data[key];
    }
}