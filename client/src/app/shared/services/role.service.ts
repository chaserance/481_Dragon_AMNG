import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pageable} from '../../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Role} from '../../model/role';
import {User} from '../../model/user';
import {EntityService} from './entity.service';

@Injectable()
export class RoleService extends EntityService<Role> {
  baseUrl = environment.baseUrl;

  private rolesUrl = this.baseUrl + '/api/roles?';

  /** GET ALL **/
  getRoles(pageable?: Pageable): Observable<PageableResults<Role>> {
    return this.http.get<PageableResults<Role>>(this.rolesUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** GET ALL BY USER **/
  getRolesByUser(user: User): Observable<PageableResults<Role>> {
    return this.http.get<PageableResults<Role>>(user._links.roles.href)
      .pipe();
  }

  /** POST **/
  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.rolesUrl, role)
      .pipe();
  }

  /** PUT **/
  updateRole(role: Role, uri?: string): Observable<any> {
    const requestUri = role._links.self.href;
    const body: any = role;
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deleteRole(role: Role): Observable<any> {
    return this.http.delete<Role>(role._links.self.href)
      .pipe();
  }
}
