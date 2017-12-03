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
import { ProfileComponent } from './component/content/profile/profile.component';
import { ProfileEditComponent } from './component/content/profile/profile-edit/profile-edit.component';
import { ChildComponent } from './component/content/child/child.component';
import { AddChildComponent } from './component/content/child/add-child/add-child.component';
import { CourseRegistrationComponent } from './component/content/courses/course-registration/course-registration.component';
import { CoursesComponent } from './component/content/courses/courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home'} },
  { path: 'about', component: AboutComponent, data: { state: 'about'} },
  { path: 'login', component: LoginComponent, canActivate: [LoginActiveAuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'teacher', component: TeacherComponent, canActivate: [TeacherAuthguard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthguard] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'child', component: ChildComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
  { path: 'child/add', component: AddChildComponent },
  { path: 'course/registration', component: CourseRegistrationComponent },
  { path: 'courses', component: CoursesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
