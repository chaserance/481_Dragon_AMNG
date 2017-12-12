import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbDropdownModule.forRoot()
  ],
  declarations: [AdminComponent, SidebarComponent]
})
export class AdminModule {}
