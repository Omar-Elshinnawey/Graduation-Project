import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from './shared.module';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrderService} from '../services';

import {OrderDetailComponent, OrdersComponent} from '../components';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports:[CommonModule,
    SharedModule,
    TranslateModule.forChild(),
    OrdersRoutingModule],
    providers:[OrderService],
    declarations: [OrderDetailComponent, OrdersComponent],
})
export class OrdersModule{}