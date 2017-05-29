import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdersModule} from './orders.module';

import {LoginComponent, DashboardComponent, UsersComponent, RefundComponent} from '../components';

import {AuthGuard} from '../services';

declare var require: any;

const routes: Routes = [
    { path: 'login' , component: LoginComponent},    
    { path: 'login/:error' , component: LoginComponent},        
    { path: 'dashboard', loadChildren: './dashboard.module#DashboardModule?chunkName=bundle'},
    { path: 'usersOrders', loadChildren: './orders.module#OrdersModule?chunkName=bundle'},
    {path: '', redirectTo: '/login', pathMatch: 'full'}    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}