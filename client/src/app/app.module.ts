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
  TooltipModule, AccordionModule
} from 'ngx-bootstrap';
import {TokenInterceptorService} from './shared/services/token-interceptor.service';
import { AboutComponent } from './component/content/about/about.component';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {AuthService} from './shared/services/auth.service';
import {UserService} from './shared/services/user.service';
import {BillService} from './shared/services/bill.service';
import {ChildService} from './shared/services/child.service';
import {CourseService} from './shared/services/course.service';
import {PerformanceService} from './shared/services/performance.service';
import {PrivilegeService} from './shared/services/privilege.service';
import {ProgramService} from './shared/services/program.service';
import {PromotionService} from './shared/services/promotion.service';
import {RoleService} from './shared/services/role.service';

import {ValidatorsService} from './shared/services/validators.service';
import {LoginActiveAuthGuard} from './shared/guard/login-active.authguard';
import {CanActivateAuthGuard} from './shared/guard/can-active.authguard';
import {TeacherAuthguard} from './shared/guard/teacher.authguard';
import {AdminAuthguard} from './shared/guard/admin.authguard';
import { SessionService } from './shared/services/session.service';
import {JwtInterceptorService} from './shared/services/jwt-interceptor.service';
import {EntityService} from './shared/services/entity.service';
import {SharedPipesModule} from './shared/pipes/shared-pipes.module';
import {SharedDirectiveModule} from './shared/directive/shared-directive.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AboutComponent,
  ],
  imports: [
    SharedDirectiveModule,
    SharedPipesModule,
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
    TabsModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
    EntityService,
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
