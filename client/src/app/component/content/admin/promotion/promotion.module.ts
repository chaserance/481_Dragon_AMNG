import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromotionComponent} from './promotion.component';
import {PromotionRoutingModule} from './promotion-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {PageHeaderModule} from '../../../../shared/modules/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    PromotionRoutingModule,
    Ng2SmartTableModule,
    PageHeaderModule,
  ],
  declarations: [PromotionComponent]
})
export class PromotionModule { }
