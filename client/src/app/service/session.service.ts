import { Injectable } from '@angular/core';
import { Session } from '../component/content/teacher/session';
import { SESSIONS } from '../component/content/teacher/mock-sessions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SessionService {

  constructor() { }

  getSessions(): Observable<Session[]> {
    return of(SESSIONS);
  }

  getSession(id: number): Observable<Session> {
    return of(SESSIONS.find(session => session.id === id));
  }
}
