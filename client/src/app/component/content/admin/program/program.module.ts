import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgramRoutingModule, routedComponents} from './program-routing.module';
import {PageHeaderModule} from '../../../../shared/modules/page-header/page-header.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    Ng2SmartTableModule,
    PageHeaderModule,
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class ProgramModule { }
