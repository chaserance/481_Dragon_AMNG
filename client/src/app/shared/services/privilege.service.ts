import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pageable} from '../../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Privilege} from '../../model/privilege';
import {Role} from '../../model/role';
import {EntityService} from './entity.service';

@Injectable()
export class PrivilegeService extends EntityService<Privilege> {
  baseUrl = environment.baseUrl;

  private privilegesUrl = this.baseUrl + '/api/privileges?';

  /** GET ALL **/
  getPrivileges(pageable?: Pageable): Observable<PageableResults<Privilege>> {
    console.log(this.privilegesUrl + pageable);
    return this.http.get<PageableResults<Privilege>>(this.privilegesUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** GET ALL BY ROLE **/
  getPrivilegeByRole(role: Role): Observable<PageableResults<Privilege>> {
    return this.http.get<PageableResults<Privilege>>(role._links.privileges.href)
      .pipe();
  }

  /** POST **/
  addPrivilege(privilege: Privilege): Observable<Privilege> {
    return this.http.post<Privilege>(this.privilegesUrl, privilege)
      .pipe();
  }

  /** PUT **/
  updatePrivilege(privilege: Privilege, uri?: string): Observable<any> {
    const requestUri = privilege._links.self.href;
    const body: any = privilege;
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deletePrivilege(privilege: Privilege): Observable<any> {
    return this.http.delete<Privilege>(privilege._links.self.href)
      .pipe();
  }
}
