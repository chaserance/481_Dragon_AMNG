import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {TeacherComponent} from './teacher.component';
import {SessionDetailComponent} from './session-detail/session-detail.component';
import {FormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../../shared/pipes/shared-pipes.module';
import {SessionsComponent} from './sessions/sessions.component';

@NgModule({
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    SharedPipesModule
  ],
  declarations: [
    TeacherComponent,
    SessionsComponent,
    SessionDetailComponent
  ]
})
export class TeacherModule {}
