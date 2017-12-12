import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../../model/pageable';
import {PageableResults} from '../../model/pageable-results';

@Injectable()
export class UserService {

  baseUrl = environment.baseUrl;

  private userUrl = this.baseUrl + '/api/users';

  constructor(private http: HttpClient) { }

  /** Exist by Username **/
  isExist(email: string): Observable<any> {
    return this.http.get(this.baseUrl + `/api/auth/register/exist?email=${email}`);
  }

  /** GET ME **/
  getMe(): Observable<User> {
    return this.http.get<User>(this.userUrl + '/me')
      .pipe();
  }

  /** GET ALL **/
  getUsers(pageable?: Pageable): Observable<PageableResults<User>> {
    return this.http.get<PageableResults<User>>(this.userUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** PUT **/
  updateUser(user: User, uri?: string): Observable<any> {
    let requestUri = user._links.self.href;
    let body: any = user;
    // if (uri) {
    //   requestUri = user._links.program.href;
    //   body = uri;
    // }
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deleteUser(user: User): Observable<any> {
    return this.http.delete<User>(user._links.self.href)
      .pipe();
  }
}
