import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {UserService} from './user.service';


@Injectable()
export class AuthService {
  private baseUrl = environment.baseUrl + '/api/auth';
  private authUrl = this.baseUrl + '/login';
  private refreshUrl = this.baseUrl + '/refresh';
  private registerUrl = this.baseUrl + '/register';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });
  private userKey = 'currentUser';
  private me: User;

  constructor(
    private http: Http,
    private router: Router,
    private userService: UserService) { }

  get firstname() {
    const currentUser = JSON.parse(localStorage.getItem(this.userKey));
    const firstname = currentUser && currentUser.firstname;
    return firstname ? firstname : '';
  }

  get isAuthenticated() {
    const token = this.getToken();
    return tokenNotExpired(null, token);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
      .map((response: Response) => {
        // store response in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.userKey, JSON.stringify(response.json()));
        this.getMe();
        // this.getLoggedInName.emit(username);
      }).catch((error: any) => {
          return Observable.throw(error.json().message || 'Server error');
      });
  }

  register(user): Observable<Response> {
    delete user.confrimPassword;
    return this.http.post(this.registerUrl, user);
  }

  refresh(): Observable<any> {
    const refresh_token = this.getRefreshToken();
    if (!!refresh_token === false || !tokenNotExpired(null, refresh_token) ) {
      this.router.navigate(['/login']);
      return Observable.throw(!!refresh_token ? 'Refresh token expired' : 'Refresh token not existed');
    } else {
      return this.http.get(this.refreshUrl, this.jwtRequest(refresh_token))
        .map((response: Response) => {
          // store response in local storage to keep user logged in between page refreshes
          const updateUser = JSON.parse(localStorage.getItem(this.userKey));
          updateUser.access_token = response.json().token;
          localStorage.setItem(this.userKey, JSON.stringify(updateUser));
          this.getMe();
        }).catch((error: any) => {
          console.log(error);
          return Observable.throw(error.message || 'Server error');
        });
    }
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem(this.userKey);
    this.me = null;
  }

  getToken(): string {
    try {
      const currentUser = JSON.parse(localStorage.getItem(this.userKey));
      const token = currentUser && currentUser.access_token;
      return token ? token : '';
    }catch (error) {
      console.log(error);
    }
  }

  getRefreshToken(): string {
    const currentUser = JSON.parse(localStorage.getItem(this.userKey));
    const token = currentUser && currentUser.refresh_token;
    return token ? token : '';
  }

  jwtRequest(token: string): RequestOptions {
    // create authorization header with jwt token
    const headers = new Headers({ 'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + token });
    return new RequestOptions({ headers: headers });
  }

  getRoles(): Array<any> {
    const user = localStorage.getItem(this.userKey);
    if (!user) {
      return [];
    }
    return JSON.parse(user).scope;
  }

  get isTeacher() {
    if (this.isAuthenticated) {
      const roles = this.getRoles();
      return roles.find(role => (role === 'ROLE_TEACHER'));
    }
    return false;

  }
  get isAdmin() {
    if (this.isAuthenticated) {
      const roles = this.getRoles();
      return roles.find(role => (role === 'ROLE_ADMIN'));
    }
    return false;
  }

  getMe(): void {
    this.userService.getMe()
      .subscribe(user => this.me = user);
  }
}
