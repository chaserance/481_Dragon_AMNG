import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pageable} from '../../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Child} from '../../model/child';
import {User} from '../../model/user';
import {Performance} from '../../model/performance';
import {EntityService} from './entity.service';
import {StudentLevel} from '../../model/student-level';

@Injectable()
export class ChildService extends EntityService<Child> {
  baseUrl = environment.baseUrl;

  private childrenUrl = this.baseUrl + '/api/children?';

  /** GET ALL **/
  getChildren(pageable?: Pageable): Observable<PageableResults<Child>> {
    console.log(this.childrenUrl + pageable);
    return this.http.get<PageableResults<Child>>(this.childrenUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** GET ALL BY USER **/
  getChildrenByUser(user: User): Observable<PageableResults<Child>> {
    return this.http.get<PageableResults<Child>>(user._links.children.href)
      .pipe();
  }

  /** GET BY Performance **/
  getChildByPerformance(performance: Performance): Observable<Child> {
    return this.http.get<Child>(performance._links.child.href)
      .pipe();
  }

  /** POST **/
  addChild(child: Child, user?: User): Observable<Child> {
    child.entryLevel = StudentLevel.FIRST;
    child.currentLevel = StudentLevel.FIRST;
    child.dob = new Date();
    let rto = this.http.post<Child>(this.childrenUrl, child);
    if (user) {
      rto = rto.delayWhen(c => this.updateChild(c, user._links.self.href));
    }
    return rto;
  }

  /** PUT **/
  updateChild(child: Child, uri?: string): Observable<any> {
    let requestUri = child._links.self.href;
    let body: any = child;
    if (uri) {
      requestUri = child._links.user.href;
      body = uri;
    }
    return this.http.put<Child>(requestUri, body)
      .pipe(
      );
  }

  /** DELETE **/
  deleteChild(child: Child): Observable<any> {
    return this.http.delete<Child>(child._links.self.href)
      .pipe();
  }
}
