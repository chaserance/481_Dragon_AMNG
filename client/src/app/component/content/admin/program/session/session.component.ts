import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../../../shared/services/session.service';
import {Session} from '../../../../../model/session';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DaysInWeek} from '../../../../../model/days-in-week';
import {UserService} from '../../../../../shared/services/user.service';
import {User} from '../../../../../model/user';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  session: Session;
  daysInWeek: DaysInWeek;
  allTeachers: User[];

  constructor(
    private location: Location,
    private sessionService: SessionService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sessionService.getEntityByUrl(id)
      .subscribe(session => {
        this.session = session;
        this.daysInWeek = new DaysInWeek(this.session.schedule.days);
        this.getTeacher();
      });
  }

  getTeacher(): void {
    this.userService.getByRoleName('ROLE_TEACHER')
      .subscribe(ts => {
        this.allTeachers = ts._embedded.result_array;

        this.userService.getEntityByUrl(this.session._links.teacher.href, true)
          .subscribe(t => this.session.teacher = t,
            e => this.session.teacher = this.allTeachers[0]);
      });
  }

  onSave(): void {
    this.session.schedule.days = this.daysInWeek.encode();
    this.sessionService.updateSession(this.session)
      .subscribe(_ => {

        this.sessionService.updateSession(this.session, this.session.teacher._links.self.href)
          .subscribe(s => this.getSession());
      });
  }

  goBack(): void {
    this.location.back();
  }
}
