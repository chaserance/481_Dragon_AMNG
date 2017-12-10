import { Component, OnInit } from '@angular/core';
import { Session } from '../session';
import { Student } from '../student';

import { SessionService } from '../../../../service/session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions: Session[];

  constructor(private sessionService: SessionService) { }

  getSessions(): void {
    this.sessionService.getSessions()
        .subscribe(sessions => this.sessions = sessions);
  }

  ngOnInit() {
    this.getSessions();
  }
}
