import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../animation/router.animation';
import {AuthService} from '../../../../shared/services/auth.service';
import {UserService} from '../../../../shared/services/user.service';
import {ProgramService} from '../../../../shared/services/program.service';
import {CourseService} from '../../../../shared/services/course.service';
import {PromotionService} from '../../../../shared/services/promotion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition]
})
export class DashboardComponent implements OnInit {
  public alerts: Array<any> = [];
  private greetings = ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];

  constructor(public auth: AuthService,
              private userService: UserService,
              private programService: ProgramService,
              private courseService: CourseService,
              private promotionService: PromotionService) {

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(arr => this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Current users amount: ' + arr._embedded.result_array.length
      }));
    this.programService.getPrograms()
      .subscribe(arr => this.alerts.push({
        id: 2,
        type: 'warning',
        message: 'Current programs amount: ' + arr._embedded.result_array.length
      }));
    this.courseService.getCourses()
      .subscribe(arr => this.alerts.push({
        id: 1,
        type: 'danger',
        message: 'Current total courses amount: ' + arr._embedded.result_array.length
      }));
    this.promotionService.getPromotions()
      .subscribe(arr => this.alerts.push({
        id: 1,
        type: 'info',
        message: 'Current total promotions amount: ' + arr._embedded.result_array.length
      }));
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  getGreeting(): string {
    const hours = new Date().getHours();
    if (hours > 0 && hours <= 12) {
      return this.greetings[0];
    } else if (hours > 12 && hours <= 17) {
      return this.greetings[1];
    } else if (hours > 17 && hours <= 21) {
      return this.greetings[2];
    } else {
      return this.greetings[3];
    }
  }
}
