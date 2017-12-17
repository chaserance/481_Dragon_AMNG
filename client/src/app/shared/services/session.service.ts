import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pageable} from '../../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Session} from '../../model/session';
import {User} from '../../model/user';
import {EntityService} from './entity.service';
import {Course} from '../../model/course';
import {tap} from 'rxjs/operators';

@Injectable()
export class SessionService extends EntityService<Session> {
  baseUrl = environment.baseUrl;

  private sessionsUrl = this.baseUrl + '/api/sessions?';

  /** GET ALL **/
  getSessions(pageable?: Pageable): Observable<PageableResults<Session>> {
    return this.http.get<PageableResults<Session>>(this.sessionsUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** GET BY USER **/
  getSessionsByUser(user: User, pageable?: Pageable): Observable<PageableResults<Session>> {
    return this.http.get<PageableResults<Session>>(user._links.sessions.href)
      .pipe();
  }

  /** GET BY Course **/
  getSessionsByCourse(course: Course, pageable?: Pageable): Observable<PageableResults<Session>> {
    return this.http.get<PageableResults<Session>>(course._links.sessions.href)
      .pipe();
  }

  /** POST **/
  addSession(session: Session, course?: Course): Observable<Session> {
    this.newSessionDefaultSetting(session);
    let rto = this.http.post<Session>(this.sessionsUrl, session);
    if (course) {
      rto = rto.delayWhen(s => this.updateSession(s, course._links.self.href));
    }
    return rto;
  }

  /** PUT **/
  updateSession(session: Session, uri?: string): Observable<any> {
    let requestUri = session._links.self.href;
    let body: any = session;
    if (uri) {
      if (uri.indexOf('course') !== -1) {
        requestUri = session._links.course.href;
      } else {
        requestUri = session._links.teacher.href;
      }
      body = uri;
    }
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deleteSession(session: Session): Observable<any> {
    return this.http.delete<Session>(session._links.self.href)
      .pipe();
  }

  private newSessionDefaultSetting(session: Session): void {
    session.sessionDescription = 'N/A';
    session.period = {
      startDate: new Date(),
      endDate: new Date()
    };
    session.schedule = {
      days: 'M_W____',
      startTime: new Date(),
      endTime: new Date()
    };
  }
}

