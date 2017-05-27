import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent, DashboardComponent, OrdersComponent, UsersComponent, OrderDetailComponent} from './components';

import {AuthGuard} from './services';

const routes: Routes = [
    { path: 'login' , component: LoginComponent},    
    { path: 'login/:error' , component: LoginComponent},        
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    { path: 'usersOrders', component: OrdersComponent, canActivate:[AuthGuard]},
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    {path: 'usersOrders/detail', component: OrderDetailComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'}    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}