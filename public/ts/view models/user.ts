import {ROLES} from './roles';

export class User{
    username: string;
    role: number;
    isbanned: boolean;
    average: number;

    constructor(username: string, role: number, isbanned:boolean, average: number){
        this.username = username;
        this.role = role;
        this.isbanned = isbanned;

        if(role === ROLES.PROVIDER)
            this.average = average;
    }
}