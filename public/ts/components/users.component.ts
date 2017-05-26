import { Component, OnInit} from '@angular/core';

import {HeaderService, UsersService, ToastService, TranslationService} from '../services';

import {User, ROLES} from '../view models';

@Component({
    selector: 'users',
    templateUrl: '/assets/views/users.component.html',
    styleUrls:['assets/css/users.component.css']
})
export class UsersComponent implements OnInit{

    users: User[];
    ROLES = ROLES;
    params = {position: 'top', delay: 50, tooltip: 'Click to view detail'};

    constructor(public header: HeaderService,
                private usersService: UsersService, 
                public toast: ToastService,
                public translate: TranslationService){}

    ngOnInit(){
        this.header.show();

        this.usersService.getUsers()
        .subscribe(
            (users) => { this.users = users },
            (err) => { this.toast.create(err, 'danger') }
        );
    }

    toggleBan(user: User){
        this.usersService.toggleBan(user)
        .subscribe(
            (result) => {user.isbanned = !user.isbanned},
            (err) => { this.toast.create(err, 'danger')}
        )
    }

    viewDetail(user: User){
        this.usersService.getUserDetail(user)
        .subscribe(
            (average: number) => user.average = average,
            (err) => this.toast.create(err, 'danger')
        );
    }

    
}