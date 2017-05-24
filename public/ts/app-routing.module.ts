import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent, DashboardComponent, OrdersComponent} from './components';

import {AuthGuard} from './services';

const routes: Routes = [
    { path: 'login' , component: LoginComponent},    
    { path: 'login/:error' , component: LoginComponent},        
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    { path: 'orders', component: OrdersComponent, canActivate:[AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'}    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}