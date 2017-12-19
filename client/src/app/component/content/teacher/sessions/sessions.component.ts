import { Component, OnInit } from '@angular/core';


import { SessionService } from '../../../../shared/services/session.service';
import {Session} from '../../../../model/session';
import {PerformanceService} from '../../../../shared/services/performance.service';
import {UserService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions: Session[];

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private performanceService: PerformanceService) {}

  getSessions(): void {
    this.userService.getMe().subscribe(user => { console.log(user);
      this.sessionService.getSessionsByUser(user)
        .subscribe(sessions => this.sessions = sessions._embedded.result_array);
    });
  }

  getPerformancesBySession(session: Session) {
    return this.performanceService.getChildrenBySession(session);
  }

  ngOnInit() {
    this.getSessions();
  }
}
