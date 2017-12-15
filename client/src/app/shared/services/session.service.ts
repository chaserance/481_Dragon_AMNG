import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pageable} from '../../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Session} from '../../model/session';
import {User} from '../../model/user';
import {EntityService} from './entity.service';
import {map} from 'rxjs/operators';

@Injectable()
export class SessionService extends EntityService<Session> {
  baseUrl = environment.baseUrl;

  private sessionsUrl = this.baseUrl + '/api/sessions/';

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

  /** POST **/
  addSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.sessionsUrl, session)
      .pipe();
  }

  /** PUT **/
  updateSession(session: Session, uri?: string): Observable<any> {
    const requestUri = session._links.self.href;
    const body: any = session;
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deleteSession(session: Session): Observable<any> {
    return this.http.delete<Session>(session._links.self.href)
      .pipe();
  }
}

