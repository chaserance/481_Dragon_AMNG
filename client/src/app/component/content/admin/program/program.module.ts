import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgramRoutingModule} from './program-routing.module';
import {PageHeaderModule} from '../../../../shared/modules/page-header/page-header.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ConfirmModalModule} from '../../../../shared/modules/confirm-modal/confirm-modal.module';
import { SessionComponent } from './session/session.component';
import {ProgramComponent} from './program.component';
import { ListComponent } from './list/list.component';
import { CourseComponent } from './course/course.component';
import {SharedPipesModule} from '../../../../shared/pipes/shared-pipes.module';
import { DetailComponent } from './detail/detail.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, TimepickerModule} from 'ngx-bootstrap';
import {SharedDirectiveModule} from '../../../../shared/directive/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    Ng2SmartTableModule,
    PageHeaderModule,
    ConfirmModalModule,
    SharedPipesModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    SharedDirectiveModule
  ],
  declarations: [
    ProgramComponent,
    SessionComponent,
    ListComponent,
    CourseComponent,
    DetailComponent,
  ]
})
export class ProgramModule { }
