import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserManagementComponent} from './user-management.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      { path: '', redirectTo: 'list' },
      { path: 'list', component: ListComponent },
      { path: 'detail/:id', component: DetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
