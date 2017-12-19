import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {CourseComponent} from './course/course.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      { path: '', redirectTo: 'programs' },
      { path: 'programs', component: ListComponent },
      { path: 'program-detail/:id', component: DetailComponent},
      { path: 'course/:id', component: CourseComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
