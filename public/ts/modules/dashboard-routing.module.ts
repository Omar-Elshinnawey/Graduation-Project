import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent, UsersComponent, RefundComponent} from '../components';
import {AuthGuard} from '../services';

const routes: Routes = [
    {path:'', component: DashboardComponent, canActivate: [AuthGuard]},
    {path:'users', component: UsersComponent, canActivate: [AuthGuard]},
    {path: 'userRefunds', component: RefundComponent, canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule{}