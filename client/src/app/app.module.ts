import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CarouselComponent } from './component/content/carousel/carousel.component';
import { LoginComponent } from './component/content/login/login.component';
import { HomeComponent } from './component/content/home/home.component';
import { RegisterComponent } from './component/content/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  BsDropdownModule, CarouselModule, CollapseModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import { MatchHeightDirective } from './directive/match-height.directive';
import {TokenInterceptorService} from './service/token-interceptor.service';
import { AboutComponent } from './component/content/about/about.component';
import {HttpModule} from '@angular/http';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import {CommonModule} from '@angular/common';
import { ProfileComponent } from './component/content/profile/profile.component';
import { TeacherComponent } from './component/content/teacher/teacher.component';
import { AdminComponent } from './component/content/admin/admin.component';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {BillService} from './service/bill.service';
import {ChildService} from './service/child.service';
import {CourseService} from './service/course.service';
import {PerformanceService} from './service/performance.service';
import {PrivilegeService} from './service/privilege.service';
import {ProgramService} from './service/program.service';
import {PromotionService} from './service/promotion.service';
import {RoleService} from './service/role.service';
import {ValidatorsService} from './service/validators.service';
import {LoginActiveAuthGuard} from './service/login-active.authguard';
import {CanActivateAuthGuard} from './service/can-active.authguard';
import {TeacherAuthguard} from './service/teacher.authguard';
import {AdminAuthguard} from './service/admin.authguard';
import { ChildComponent } from './component/content/child/child.component';
import { ProfileEditComponent } from './component/content/profile/profile-edit/profile-edit.component';
import { AddChildComponent } from './component/content/child/add-child/add-child.component';
import { CourseRegistrationComponent } from './component/content/courses/course-registration/course-registration.component';
import { CoursesComponent } from './component/content/courses/courses.component';
import { SessionsComponent } from './component/content/teacher/sessions/sessions.component';
import { StudentDetailComponent } from './component/content/teacher/student-detail/student-detail.component';
import { SessionDetailComponent } from './component/content/teacher/session-detail/session-detail.component';
import { SessionService } from './service/session.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MatchHeightDirective,
    AboutComponent,
    CapitalizePipe,
    ProfileComponent,
    TeacherComponent,
    AdminComponent,
    ChildComponent,
    ProfileEditComponent,
    AddChildComponent,
    CourseRegistrationComponent,
    CoursesComponent,
    SessionsComponent,
    StudentDetailComponent,
    SessionDetailComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService,
    BillService,
    ChildService,
    CourseService,
    PerformanceService,
    ProgramService,
    PromotionService,
    PrivilegeService,
    RoleService,
    SessionService,
    ValidatorsService,
    LoginActiveAuthGuard,
    CanActivateAuthGuard,
    TeacherAuthguard,
    AdminAuthguard,
    SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
