import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../model/pageable-results';
import {Session} from '../model/session';
import {User} from '../model/user';

@Injectable()
export class SessionService {
  baseUrl = environment.baseUrl;

  private sessionsUrl = this.baseUrl + '/api/sessions/';

  constructor(private http: HttpClient) { }

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
// import { Session } from '../component/content/teacher/session';
// import { SESSIONS } from '../component/content/teacher/mock-sessions';
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';

// @Injectable()
// export class SessionService {

//   constructor() { }

//   getSessions(): Observable<Session[]> {
//     return of(SESSIONS);
//   }

//   getSession(id: number): Observable<Session> {
//     return of(SESSIONS.find(session => session.id === id));
  }
}
