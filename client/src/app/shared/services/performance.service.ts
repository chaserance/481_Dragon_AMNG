import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Child} from '../../model/child';
import {Session} from '../../model/session';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Performance} from '../../model/performance';
import {map} from 'rxjs/operators';
import {User} from '../../model/user';

@Injectable()
export class PerformanceService {

  constructor(private http: HttpClient) { }


  /** GET Children BY Session **/
  getChildrenBySession(session: Session): Observable<PageableResults<Performance>> {
    return this.http.get<PageableResults<Performance>>(session._links.performances.href)
      .pipe();
  }

  /** GET Children BY Session **/
  getSessionsByChild(child: Child): Observable<PageableResults<Performance>> {
    return this.http.get<PageableResults<Performance>>(child._links.privileges.href)
      .pipe();
  }

  /** POST By Child (Register a new session) **/
  addPerformance(child: Child, session: Session): Observable<Performance> {
    const performance = new Performance();
    performance.sessionUri = session._links.self.href;
    return this.http.post<Performance>(child._links.performances.href, performance)
      .pipe();
  }

  /** PUT By Teacher (Update child performance) **/
  updatePerformance(performance: Performance): Observable<any> {
    console.log(performance._links.self.href);
    return this.http.put<Performance>(performance._links.self.href, performance)
      .pipe();
  }

  /** DELETE By Child (withdrawal session) **/
  deletePerformance(performance: Performance): Observable<any> {
    return this.http.delete<Performance>(performance._links.self.href)
      .pipe();
  }
}
