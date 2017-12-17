import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramComponent} from './program.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {CourseComponent} from './course/course.component';
import {SessionComponent} from './session/session.component';


const routes: Routes = [
  {
    path: '',
    component: ProgramComponent,
    children: [
       { path: '', redirectTo: 'list' },
       { path: 'list', component: ListComponent },
       { path: 'detail/:id', component: DetailComponent},
       { path: 'course/:id', component: CourseComponent},
       { path: 'session/:id', component: SessionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {}
