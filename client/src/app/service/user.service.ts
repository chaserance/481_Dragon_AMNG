import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  baseUrl = environment.baseUrl;

  private userUrl = this.baseUrl + '/api/user/';

  constructor(private http: HttpClient) { }

  isExist(email: string): Observable<any> {
    return this.http.get(this.baseUrl + `/user-exist?email=${email}`);
  }

  getById(id: number) {
    return this.http.get(this.userUrl + id).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(this.userUrl + user.id, user).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(this.userUrl + id).map((response: Response) => response.json());
  }
}
