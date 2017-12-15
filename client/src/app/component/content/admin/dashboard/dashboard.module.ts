import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';
import { StatModule } from '../../../../shared';
import { ClockComponent } from './components/clock/clock.component';
import { DigitComponent } from './components/clock/digit/digit.component';
import { DotComponent } from './components/clock/dot/dot.component';

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    DashboardRoutingModule,
    StatModule,
  ],
  declarations: [
    DashboardComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    ClockComponent,
    DigitComponent,
    DotComponent
  ]
})
export class DashboardModule {}
