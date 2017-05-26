import { Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Rx';

import {HeaderService, UsersService, ToastService, TranslationService} from '../services';

import {User, ROLES} from '../view models';

@Component({
    selector: 'users',
    templateUrl: '/assets/views/users.component.html',
    styleUrls:['assets/css/users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{

    users: User[];
    ROLES = ROLES;
    params = {position: 'top', delay: 50, tooltip: 'Click to view detail'};
    subs: Subscription[];

    selectedUser:User;
    action:string;

    constructor(public header: HeaderService,
                private usersService: UsersService, 
                public toast: ToastService,
                public translate: TranslationService){
                    this.subs = new Array<Subscription>();
                }

    ngOnInit(){
        this.header.show();

        var sub = this.usersService.getUsers()
        .subscribe(
            (users) => { this.users = users },
            (err) => { this.toast.create(err, 'danger') }
        );

        this.subs.push(sub);
    }

    toggleBan(user: User){
        var sub = this.usersService.toggleBan(user)
        .subscribe(
            (result) => {user.isbanned = !user.isbanned},
            (err) => { this.toast.create(err, 'danger')}
        );
        this.subs.push(sub);
    }

    viewDetail(user: User){
        var sub = this.usersService.getUserDetail(user)
        .subscribe(
            (average: number) => user.average = average,
            (err) => this.toast.create(err, 'danger')
        );

        this.subs.push(sub);
    }

    setSelectedUser(user:User){
        this.selectedUser = user;
        this.action = user.isbanned? 'UNBAN': 'BAN';
    }

    ngOnDestroy(){
        this.subs.forEach(sub => sub.unsubscribe());
    }   
}