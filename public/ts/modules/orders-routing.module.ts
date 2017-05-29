import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {OrderDetailComponent, OrdersComponent} from '../components';
import {AuthGuard} from '../services';

const routes: Routes = [
    {path:'', component: OrdersComponent, canActivate: [AuthGuard]},
    {path:'detail', component: OrderDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule{}