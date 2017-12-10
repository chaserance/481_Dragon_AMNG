import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../model/pageable-results';
import {Child} from '../model/child';

@Injectable()
export class ChildService {
  baseUrl = environment.baseUrl;

  private childrenUrl = this.baseUrl + '/api/children/';

  constructor(private http: HttpClient) { }

  /** GET ALL **/
  getChildren(pageable?: Pageable): Observable<PageableResults<Child>> {
    console.log(this.childrenUrl + pageable);
    return this.http.get<PageableResults<Child>>(this.childrenUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** POST **/
  addChild(child: Child): Observable<Child> {
    return this.http.post<Child>(this.childrenUrl, child)
      .pipe();
  }

  /** PUT **/
  updateChild(child: Child, uri?: string): Observable<any> {
    const requestUri = child._links.self.href;
    const body: any = child;
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deleteChild(child: Child): Observable<any> {
    return this.http.delete<Child>(child._links.self.href)
      .pipe();
  }
}
