import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/content/home/home.component';
import { AboutComponent } from './component/content/about/about.component';
import { LoginComponent } from './component/content/login/login.component';
import { LoginActiveAuthGuard } from './service/login-active.authguard';
import { CanActivateAuthGuard } from './service/can-active.authguard';
import { RegisterComponent } from './component/content/register/register.component';
import {TeacherComponent} from './component/content/teacher/teacher.component';
import {AdminComponent} from './component/content/admin/admin.component';
import {TeacherAuthguard} from './service/teacher.authguard';
import {AdminAuthguard} from './service/admin.authguard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home'} },
  { path: 'about', component: AboutComponent, data: { state: 'about'} },
  { path: 'login', component: LoginComponent, canActivate: [LoginActiveAuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'teacher', component: TeacherComponent, canActivate: [TeacherAuthguard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthguard] },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
