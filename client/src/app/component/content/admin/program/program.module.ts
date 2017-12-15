import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgramRoutingModule, routedComponents} from './program-routing.module';
import {PageHeaderModule} from '../../../../shared/modules/page-header/page-header.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ConfirmModalModule} from '../../../../shared/modules/confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    Ng2SmartTableModule,
    PageHeaderModule,
    ConfirmModalModule
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class ProgramModule { }
