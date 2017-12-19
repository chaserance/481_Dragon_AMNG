import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {BsDatepickerModule, TabsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../../shared/pipes/shared-pipes.module';
import {SettingComponent} from './setting/setting.component';
import {MainComponent} from './main/main.component';
import {ChildComponent} from './child/child.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ChildDetailComponent} from './child-detail/child-detail.component';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TabsModule.forRoot(),
    FormsModule,
    SharedPipesModule,
    Ng2SmartTableModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    SettingComponent,
    MainComponent,
    ChildComponent,
    ChildDetailComponent,
  ],
  providers: [DatePipe],
})
export class ProfileModule { }
