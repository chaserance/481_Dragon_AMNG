import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/content/home/home.component';
import { AboutComponent } from './component/content/about/about.component';
import { LoginComponent } from './component/content/login/login.component';
import { LoginActiveAuthGuard } from './shared/guard/login-active.authguard';
import { CanActivateAuthGuard } from './shared/guard/can-active.authguard';
import { RegisterComponent } from './component/content/register/register.component';
import {TeacherAuthguard} from './shared/guard/teacher.authguard';
import {AdminAuthguard} from './shared/guard/admin.authguard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home'} },
  { path: 'about', component: AboutComponent, data: { state: 'about'} },
  { path: 'login', component: LoginComponent, canActivate: [LoginActiveAuthGuard] },
  { path: 'profile', loadChildren: './component/content/profile/profile.module#ProfileModule', canActivate: [CanActivateAuthGuard] },
  { path: 'teacher', loadChildren: './component/content/teacher/teacher.module#TeacherModule', canActivate: [TeacherAuthguard] },
  { path: 'admin', loadChildren: './component/content/admin/admin.module#AdminModule', canActivate: [AdminAuthguard] },
  { path: 'register', component: RegisterComponent },
  { path: 'not-found', loadChildren: './component/not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
