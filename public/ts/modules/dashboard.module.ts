import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from './shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {DashboardRoutingModule} from './dashboard-routing.module';

import {UsersService, RefundService} from '../services';

import {DashboardComponent, UsersComponent, RefundComponent} from '../components';

@NgModule({
    imports:[CommonModule,
    SharedModule,
    TranslateModule.forChild(),
    DashboardRoutingModule
    ],
    providers:[UsersService,
                RefundService],
    declarations: [DashboardComponent,
                    UsersComponent,
                    RefundComponent],
})
export class DashboardModule{}