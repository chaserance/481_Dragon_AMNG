import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {SessionDetailComponent} from './session-detail/session-detail.component';
import {SessionsComponent} from './sessions/sessions.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      { path: '', redirectTo: 'sessions' },
      { path: 'sessions', component: SessionsComponent },
      { path: 'sessionDetail/:id', component: SessionDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
