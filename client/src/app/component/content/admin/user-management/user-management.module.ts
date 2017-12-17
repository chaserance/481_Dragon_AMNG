import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PageHeaderModule} from '../../../../shared/modules/page-header/page-header.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap';
import {UserManagementComponent} from './user-management.component';
import {UserManagementRoutingModule} from './user-management-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import {SharedPipesModule} from '../../../../shared/pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    PageHeaderModule,
    FormsModule,
    ButtonsModule.forRoot(),
    UserManagementRoutingModule,
    SharedPipesModule
  ],
  providers: [DatePipe],
  declarations: [UserManagementComponent, ListComponent, DetailComponent]
})
export class UserManagementModule { }
