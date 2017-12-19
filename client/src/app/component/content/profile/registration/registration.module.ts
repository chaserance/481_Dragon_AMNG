import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from './registration-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {CourseComponent} from './course/course.component';
import { ButtonRenderComponent } from './course/button-render/button-render.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    RegistrationComponent,
    ListComponent,
    DetailComponent,
    CourseComponent,
    ButtonRenderComponent
  ],
  entryComponents: [ButtonRenderComponent],
  providers: [DatePipe]
})
export class RegistrationModule { }
